import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // <-- Hook Navigasi

const KalkulatorScreen = () => {
  // HOOKS: State untuk mengelola input dan hasil
  const navigation = useNavigation(); // <-- Menggunakan Hook useNavigation
  const [berat, setBerat] = useState(''); // Berat dalam kg
  const [tinggi, setTinggi] = useState(''); // Tinggi dalam cm
  const [hasilIMT, setHasilIMT] = useState(null);
  const [kategori, setKategori] = useState('');

  const hitungBMI = () => {
    // ... (Logika Validasi & Perhitungan IMT yang sama dari kode sebelumnya) ...

    if (!berat || !tinggi || isNaN(berat) || isNaN(tinggi) || parseFloat(berat) <= 0 || parseFloat(tinggi) <= 0) {
      Alert.alert('Input Tidak Valid', 'Pastikan Berat dan Tinggi diisi dengan angka positif.');
      setHasilIMT(null);
      setKategori('');
      return;
    }

    const tinggiMeter = parseFloat(tinggi) / 100;
    const beratKg = parseFloat(berat);
    const imt = beratKg / (tinggiMeter * tinggiMeter);
    const imtBulat = imt.toFixed(2);

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

    setHasilIMT(imtBulat);
    setKategori(imtKategori);
  };

  const resetForm = () => {
    setBerat('');
    setTinggi('');
    setHasilIMT(null);
    setKategori('');
  };

  // Fungsi navigasi yang membawa data ke layar Detail
  const goToDetail = () => {
    // Navigasi ke layar 'Detail' sambil membawa parameter hasil dan kategori
    if (hasilIMT) {
      navigation.navigate('Detail', {
        imt: hasilIMT,
        kategori: kategori,
      });
    } else {
      Alert.alert('Belum Dihitung', 'Silakan hitung IMT Anda terlebih dahulu.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Kalkulator IMT</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Berat Badan (kg):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={berat}
          onChangeText={setBerat} // <-- Hook setBerat
          placeholder="Contoh: 70"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tinggi Badan (cm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={tinggi}
          onChangeText={setTinggi} // <-- Hook setTinggi
          placeholder="Contoh: 175"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Hitung IMT" onPress={hitungBMI} color="#1E90FF" />
        <View style={{ width: 10 }} />
        <Button title="Reset" onPress={resetForm} color="#FF6347" />
      </View>

      {hasilIMT && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>IMT Anda: {hasilIMT}</Text>
          <Text style={styles.categoryValue}>Kategori: {kategori}</Text>
          
          <TouchableOpacity 
             style={styles.detailButton} 
             onPress={goToDetail} // <-- Navigasi
          >
             <Text style={styles.detailButtonText}>Lihat Detail Kategori »</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, marginTop: 20, textAlign: 'center', color: '#333' },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 5, color: '#555' },
  input: { height: 40, borderColor: '#CCC', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, backgroundColor: '#FFF' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 30 },
  resultContainer: { marginTop: 20, padding: 20, backgroundColor: '#E0F7FA', borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#B2EBF2' },
  resultLabel: { fontSize: 18, color: '#00796B', marginBottom: 5 },
  categoryValue: { fontSize: 20, fontWeight: '600', color: '#004D40', marginBottom: 15 },
  detailButton: { backgroundColor: '#00BFFF', padding: 10, borderRadius: 5 },
  detailButtonText: { color: 'white', fontWeight: 'bold' },
});

export default KalkulatorScreen;