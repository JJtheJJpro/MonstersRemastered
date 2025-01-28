#define P1(on) ((on && (PORTA & B00000001) == B00000001) || (!on && (PORTA & B00000001) == 0)) ? PORTA ^= B00000001 : PORTA = PORTA
#define P2(on) ((on && (PORTA & B00000010) == B00000010) || (!on && (PORTA & B00000010) == 0)) ? PORTA ^= B00000010 : PORTA = PORTA
#define P3(on) ((on && (PORTA & B00000100) == B00000100) || (!on && (PORTA & B00000100) == 0)) ? PORTA ^= B00000100 : PORTA = PORTA
#define P4(on) ((on && (PORTA & B00001000) == B00001000) || (!on && (PORTA & B00001000) == 0)) ? PORTA ^= B00001000 : PORTA = PORTA
#define P5(on) ((on && (PORTA & B00010000) == B00010000) || (!on && (PORTA & B00010000) == 0)) ? PORTA ^= B00010000 : PORTA = PORTA
#define P6(on) ((on && (PORTA & B00100000) == B00100000) || (!on && (PORTA & B00100000) == 0)) ? PORTA ^= B00100000 : PORTA = PORTA
#define P7(on) ((on && (PORTA & B01000000) == B01000000) || (!on && (PORTA & B01000000) == 0)) ? PORTA ^= B01000000 : PORTA = PORTA
#define P8(on) ((on && (PORTA & B10000000) == B10000000) || (!on && (PORTA & B10000000) == 0)) ? PORTA ^= B10000000 : PORTA = PORTA
#define P9(on) ((on && (PORTC & B10000000) == B10000000) || (!on && (PORTC & B10000000) == 0)) ? PORTC ^= B10000000 : PORTG = PORTG
#define P10(on) ((on && (PORTC & B01000000) == B01000000) || (!on && (PORTC & B01000000) == 0)) ? PORTC ^= B01000000 : PORTG = PORTG

#define A1(on) ((on && (PORTC & B00100000) == B00100000) || (!on && (PORTC & B00100000) == 0)) ? PORTC ^= B00100000 : PORTC = PORTC
#define A2(on) ((on && (PORTC & B00010000) == B00010000) || (!on && (PORTC & B00010000) == 0)) ? PORTC ^= B00010000 : PORTC = PORTC
#define A3(on) ((on && (PORTC & B00001000) == B00001000) || (!on && (PORTC & B00001000) == 0)) ? PORTC ^= B00001000 : PORTC = PORTC
#define A4(on) ((on && (PORTC & B00000100) == B00000100) || (!on && (PORTC & B00000100) == 0)) ? PORTC ^= B00000100 : PORTC = PORTC
#define A5(on) ((on && (PORTC & B00000010) == B00000010) || (!on && (PORTC & B00000010) == 0)) ? PORTC ^= B00000010 : PORTC = PORTC
#define A6(on) ((on && (PORTC & B00000001) == B00000001) || (!on && (PORTC & B00000001) == 0)) ? PORTC ^= B00000001 : PORTC = PORTC
#define A7(on) ((on && (PORTD & B10000000) == B10000000) || (!on && (PORTD & B10000000) == 0)) ? PORTD ^= B10000000 : PORTD = PORTD
#define A8(on) ((on && (PORTG & B00000100) == B00000100) || (!on && (PORTG & B00000100) == 0)) ? PORTG ^= B00000100 : PORTG = PORTG
#define A9(on) ((on && (PORTG & B00000010) == B00000010) || (!on && (PORTG & B00000010) == 0)) ? PORTG ^= B00000010 : PORTG = PORTG
#define A10(on) ((on && (PORTG & B00000001) == B00000001) || (!on && (PORTG & B00000001) == 0)) ? PORTG ^= B00000001 : PORTG = PORTG

#define X1(on) ((on && (PORTL & B10000000) == B10000000) || (!on && (PORTL & B10000000) == 0)) ? PORTL ^= B10000000 : PORTL = PORTL
#define X2(on) ((on && (PORTL & B01000000) == B01000000) || (!on && (PORTL & B01000000) == 0)) ? PORTL ^= B01000000 : PORTL = PORTL
#define X3(on) ((on && (PORTL & B00100000) == B00100000) || (!on && (PORTL & B00100000) == 0)) ? PORTL ^= B00100000 : PORTL = PORTL
#define X4(on) ((on && (PORTL & B00010000) == B00010000) || (!on && (PORTL & B00010000) == 0)) ? PORTL ^= B00010000 : PORTL = PORTL
#define X5(on) ((on && (PORTL & B00001000) == B00001000) || (!on && (PORTL & B00001000) == 0)) ? PORTL ^= B00001000 : PORTL = PORTL
#define X6(on) ((on && (PORTL & B00000100) == B00000100) || (!on && (PORTL & B00000100) == 0)) ? PORTL ^= B00000100 : PORTL = PORTL
#define X7(on) ((on && (PORTL & B00000010) == B00000010) || (!on && (PORTL & B00000010) == 0)) ? PORTL ^= B00000010 : PORTL = PORTL
#define X8(on) ((on && (PORTL & B00000001) == B00000001) || (!on && (PORTL & B00000001) == 0)) ? PORTL ^= B00000001 : PORTL = PORTL
#define X9(on) ((on && (PORTB & B00001000) == B00001000) || (!on && (PORTB & B00001000) == 0)) ? PORTB ^= B00001000 : PORTB = PORTB
#define X10(on) ((on && (PORTB & B00000100) == B00000100) || (!on && (PORTB & B00000100) == 0)) ? PORTB ^= B00000100 : PORTB = PORTB

#define Door(on) ((on && (PORTB & B01) == B01) || (!on && (PORTB & B01) == 0)) ? PORTB ^= B01 : PORTB = PORTB
#define Garbage(on) ((on && (PORTB & B10) == B10) || (!on && (PORTB & B10) == 0)) ? PORTB ^= B10 : PORTB = PORTB

int main() {
    
}