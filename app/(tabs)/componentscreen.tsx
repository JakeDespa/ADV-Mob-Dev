import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Button } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.title}>Welcome to my app</Text>
        <Text style={styles.subtitle}>
          Siomai tres, ginabot, ngohiong
        </Text>

        {/* Image */}
        <Image
          source={require('@/assets/images/chloe.jpg')}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Content */}
        <Text style={styles.bodyText}>
          clean layout
        </Text>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <Button title="button" onPress={() => alert('Button pressed!')} />
        </View>

        {/* Extra filler text for scrolling */}
        <Text style={styles.bodyText}>More content here... keep scrolling 👇</Text>
        <Text style={styles.bodyText}>Tab layouts organize the app.</Text>
        <Text style={styles.bodyText}>This screen demonstrates a simple design.</Text>
        <Text style={styles.bodyText}>More content here... keep scrolling 👇</Text>
        <Text style={styles.bodyText}>Tab layouts organize the app.</Text>
        <Text style={styles.bodyText}>This screen demonstrates a simple design.</Text>
        <Text style={styles.bodyText}>More content here... keep scrolling 👇</Text>
        <Text style={styles.bodyText}>Tab layouts organize the app.</Text>
        <Text style={styles.bodyText}>This screen demonstrates a simple design.</Text>
        <Text style={styles.bodyText}>More content here... keep scrolling 👇</Text>
        <Text style={styles.bodyText}>Tab layouts organize the app.</Text>
        <Text style={styles.bodyText}>This screen demonstrates a simple design.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
    width: '60%',
  },
});
