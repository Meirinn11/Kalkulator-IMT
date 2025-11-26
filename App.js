import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  SafeAreaView,
} from 'react-native';

const HitungIMT = () => {
  const [berat, setBerat] = useState(''); // Berat dalam kg
  const [tinggi, setTinggi] = useState(''); // Tinggi dalam cm
  const [hasilIMT, setHasilIMT] = useState(null);
  const [kategori, setKategori] = useState('');

  // Fungsi untuk menghitung IMT
  const hitungBMI = () => {
    // 1. Validasi Input
    if (!berat || !tinggi || isNaN(berat) || isNaN(tinggi) || parseFloat(berat) <= 0 || parseFloat(tinggi) <= 0) {
      Alert.alert('Input Tidak Valid', 'Pastikan Berat dan Tinggi diisi dengan angka positif.');
      setHasilIMT(null);
      setKategori('');
      return;
    }

    // 2. Konversi Tinggi dari cm ke meter
    const tinggiMeter = parseFloat(tinggi) / 100; // Tinggi diinput dalam cm
    const beratKg = parseFloat(berat);

    // 3. Hitung IMT: Kg / M^2
    const imt = beratKg / (tinggiMeter * tinggiMeter);
    const imtBulat = imt.toFixed(2); // Bulatkan ke 2 desimal

    // 4. Tentukan Kategori IMT
    let imtKategori = '';
    if (imt < 18.5) {
      imtKategori = 'Berat Badan Kurang';
    } else if (imt >= 18.5 && imt < 25) {
      imtKategori = 'Berat Badan Ideal (Normal)';
    } else if (imt >= 25 && imt < 30) {
      imtKategori = 'Berat Badan Berlebih';
    } else {
      imtKategori = 'Obesitas';
    }

    // 5. Perbarui State
    setHasilIMT(imtBulat);
    setKategori(imtKategori);
  };

  // Fungsi untuk mereset input dan hasil
  const resetForm = () => {
    setBerat('');
    setTinggi('');
    setHasilIMT(null);
    setKategori('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Kalkulator Indeks Massa Tubuh</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Berat Badan (kg):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={berat}
          onChangeText={setBerat}
          placeholder="Contoh: 70"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tinggi Badan (cm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={tinggi}
          onChangeText={setTinggi}
          placeholder="Contoh: 175"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Hitung IMT"
          onPress={hitungBMI}
          color="#1E90FF"
        />
        <View style={{ width: 10 }} />
        <Button
          title="Reset"
          onPress={resetForm}
          color="#FF6347"
        />
      </View>

      {/* Tampilkan Hasil IMT jika sudah dihitung */}
      {hasilIMT && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Hasil IMT Anda:</Text>
          <Text style={styles.resultValue}>{hasilIMT}</Text>
          <Text style={styles.categoryLabel}>Kategori:</Text>
          <Text style={styles.categoryValue}>{kategori}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  resultContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#E0F7FA',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B2EBF2',
  },
  resultLabel: {
    fontSize: 18,
    color: '#00796B',
  },
  resultValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#004D40',
    marginVertical: 5,
  },
  categoryLabel: {
    fontSize: 16,
    marginTop: 10,
    color: '#00796B',
  },
  categoryValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#004D40',
  },
});

export default HitungIMT;
