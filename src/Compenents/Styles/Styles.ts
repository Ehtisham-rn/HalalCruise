import { StyleSheet } from 'react-native';
import Colors from '../Colors/Colors';

export const ButtonStyles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.primary.default,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondary: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary.default,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    color: Colors.primary.default,
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: Colors.gray.light,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledText: {
    color: Colors.gray.dark,
    fontSize: 16,
    fontWeight: '600',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  smallText: {
    fontSize: 14,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  largeText: {
    fontSize: 18,
  },
});

export const InputStyles = StyleSheet.create({
  default: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borders.light,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.text.dark,
  },
  focused: {
    borderColor: Colors.primary.default,
  },
  error: {
    borderColor: Colors.error.default,
  },
  disabled: {
    backgroundColor: Colors.backgrounds.light,
    borderColor: Colors.borders.light,
  },
});

export const CardStyles = StyleSheet.create({
  default: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.shadows.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: Colors.shadows.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.borders.light,
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.backgrounds.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
    textAlign: 'center',
    marginTop: 10,
  },
  serviceImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  serviceButton: {
    width: '50%',
    backgroundColor: Colors.Primary,
    borderRadius: 30,
    padding: 10,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: Colors.shadows.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  serviceButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center',
  },
  internalCard: {
    width: '100%',
    backgroundColor: Colors.Primary,
    borderRadius: 15,
    padding: 15,
    paddingTop: 20,
    marginVertical: 10,
    elevation: 3,
    shadowColor: Colors.shadows.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  internalCardImage: {
    marginTop:20,
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
    marginRight: 15,
  },
  internalCardTextContainer: {
    flex: 1,

  },
  internalCardTitle: {
    paddingTop:20,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 3,
  },
  internalCardSubtitle: {
    fontSize: 16,
    color: Colors.white,
    marginTop: 5,
  },
});

export const TextStyles = StyleSheet.create({
  heading1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text.dark,
  },
  body: {
    fontSize: 16,
    color: Colors.text.dark,
  },
  caption: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
}); 