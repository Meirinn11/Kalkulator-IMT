import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native'; // <-- Hook untuk mendapatkan parameter

const DetailScreen = () => {
  // HOOKS: useRoute untuk mendapatkan parameter yang dikirim dari layar sebelumnya
  const route = useRoute();
  // Mendapatkan nilai IMT dan kategori dari parameter navigasi (route.params)
  const { imt, kategori } = route.params || {}; 

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rincian Hasil IMT</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nilai Indeks Massa Tubuh Anda:</Text>
        <Text style={styles.imtValue}>{imt || 'N/A'}</Text>
        
        <Text style={styles.label}>Kategori Anda:</Text>
        <Text style={styles.categoryValue}>{kategori || 'Belum Dihitung'}</Text>
      </View>

      <Text style={styles.infoTitle}>Klasifikasi Standar IMT:</Text>
      <View style={styles.table}>
        <Text style={styles.tableHeader}>IMT</Text>
        <Text style={styles.tableHeader}>Kategori</Text>
        <Text style={styles.tableRow}> &lt; 18.5 </Text>
        <Text style={styles.tableRow}> Berat Badan Kurang </Text>
        <Text style={styles.tableRow}> 18.5 - 24.9 </Text>
        <Text style={styles.tableRow}> Berat Badan Ideal (Normal) </Text>
        <Text style={styles.tableRow}> 25.0 - 29.9 </Text>
        <Text style={styles.tableRow}> Berat Badan Berlebih </Text>
        <Text style={styles.tableRow}> ≥ 30.0 </Text>
        <Text style={styles.tableRow}> Obesitas </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F0F8FF' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#1A237E' },
  card: { padding: 20, borderRadius: 10, backgroundColor: '#E3F2FD', marginBottom: 25, alignItems: 'center', borderWidth: 1, borderColor: '#BBDEFB' },
  label: { fontSize: 16, color: '#333', marginTop: 10 },
  imtValue: { fontSize: 38, fontWeight: 'bold', color: '#0D47A1', marginVertical: 5 },
  categoryValue: { fontSize: 22, fontWeight: '600', color: '#1B5E20', marginBottom: 10 },
  infoTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 10, color: '#333' },
  table: { flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1, borderColor: '#CCC' },
  tableHeader: { width: '50%', padding: 8, fontWeight: 'bold', backgroundColor: '#B3E5FC', borderWidth: 1, borderColor: '#CCC' },
  tableRow: { width: '50%', padding: 8, borderWidth: 1, borderColor: '#CCC', backgroundColor: '#FFF' },
});

export default DetailScreen;