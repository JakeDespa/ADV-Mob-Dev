import { Image } from 'expo-image';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ScrollableScreen() {
  return (
    <ThemedView style={styles.scrollContainer}>
      <ScrollView style={styles.scrollView}>
        <ThemedText style={styles.heading}>Welcome to My App</ThemedText>
        
        <ThemedText style={[styles.paragraph, styles.centered]}>
          This is a sample text component inside a scrollable view. You can add as much content as you want here and it will be scrollable.
        </ThemedText>
        
        <Image
          source={require('@/assets/images/horse.jpg')}
          style={styles.image}
          contentFit="contain"
        />
        
        <Image
          source={require('@/assets/images/jarvis.jpg')}
          style={styles.image}
          contentFit="contain"
        />

        <Image
          source={require('@/assets/images/cat.jpg')}
          style={styles.image}
          contentFit="contain"
        />

        <ThemedText style={[styles.paragraph, styles.centered, styles.lastText]}>
          3 of my favourite images
        </ThemedText>
        
        <View style={styles.buttonSpacer} />
        
        <TouchableOpacity 
          style={[styles.button, styles.fixedBottom]}
          onPress={() => alert('Button pressed!')}
        >
          <ThemedText style={styles.buttonText}>Click Me</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    margin: 16,
    padding: 16,
    paddingTop: 40, // Add more padding at the top
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 100, // Increased bottom padding
  },
  centered: {
    textAlign: 'center',
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 30, // More space from bottom
    left: 30, // More space from left
    right: 30, // More space from right
  },
  lastText: {
    marginBottom: 100, // Extra space before the button spacer
  },
  buttonSpacer: {
    height: 80, // Fixed height spacer to ensure content doesn't hide behind button
  },
  heading: {
    fontSize: 28, // Slightly larger heading
    fontWeight: 'bold',
    marginBottom: 24, // More space below heading
    marginTop: 10, // Space above heading
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32, // More space below paragraphs
    marginTop: 10, // Space above paragraphs
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 220, // Slightly larger images
    marginVertical: 20, // More vertical spacing around images
    borderRadius: 12, // More rounded corners
    marginBottom: 30, // Extra space below images
  },
});
