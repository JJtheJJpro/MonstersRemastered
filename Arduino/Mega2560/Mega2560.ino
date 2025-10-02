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
  init();
  
  Serial.begin(9600);
  Serial.setTimeout(-1);

  //Serial1.begin(9600);
  //Serial1.setTimeout(-1);

  DDRA = B11111111;
  DDRB = B00001111;
  DDRC = B11111111;
  DDRD = B10000000;
  DDRG = B00000111;
  DDRL = B11111111;

  PORTA = B11111111;
  PORTB = B00001111;
  PORTC = B11111111;
  PORTD = B10000000;
  PORTG = B00000111;
  PORTL = B11111111;

  bool sendInfo = false;

  // bit 7 -> '0' indicating monster command, '1' indicating special command
  
  // Monster command:
  // bit 6 -> '0' indicating off, '1' indicating on
  // the rest of the bits indicate monster number

  // Special command:
  // 0b0000000 -> reset
  // 0b0000001 -> reserved
  // 0b0000010 -> reserved
  // 0b0000011 -> reserved
  // 0b0000100 -> reserved
  // 0b0000101 -> reserved
  // 0b0000110 -> reserved
  // 0b0000111 -> reserved
  // 0b0001000 -> reserved
  // 0b0001001 -> reserved
  // 0b0001010 -> reserved
  // 0b0001011 -> reserved
  // 0b0001100 -> reserved
  // 0b0001101 -> reserved
  // 0b0001110 -> reserved
  // 0b0001111 -> reserved
  // 0b0010001 -> reserved
  // 0b0010010 -> reserved
  // 0b0010011 -> reserved
  // 0b0010100 -> reserved
  // 0b0010101 -> reserved
  // 0b0010110 -> reserved
  // 0b0010111 -> reserved
  // 0b0011000 -> reserved
  // 0b0011001 -> reserved
  // 0b0011010 -> reserved
  // 0b0011011 -> reserved
  // 0b0011100 -> reserved
  // 0b0011101 -> reserved
  // 0b0011110 -> reserved
  // 0b0011111 -> reserved
  // 0b0100000 -> reserved
  // 0b0100001 -> reserved
  // 0b0100010 -> reserved
  // 0b0100011 -> reserved
  // 0b0100100 -> reserved
  // 0b0100101 -> reserved
  // 0b0100110 -> reserved
  // 0b0100111 -> reserved
  // 0b0101000 -> reserved
  // 0b0101001 -> reserved
  // 0b0101010 -> reserved
  // 0b0101011 -> reserved
  // 0b0101100 -> reserved
  // 0b0101101 -> reserved
  // 0b0101110 -> reserved
  // 0b0101111 -> reserved
  // 0b0110001 -> reserved
  // 0b0110010 -> reserved
  // 0b0110011 -> reserved
  // 0b0110100 -> reserved
  // 0b0110101 -> reserved
  // 0b0110110 -> reserved
  // 0b0110111 -> reserved
  // 0b0111000 -> reserved
  // 0b0111001 -> reserved
  // 0b0111010 -> reserved
  // 0b0111011 -> reserved
  // 0b0111100 -> reserved
  // 0b0111101 -> reserved
  // 0b0111110 -> reserved
  // 0b0111111 -> reserved
  // 0b1000000 -> reserved
  // 0b1000001 -> reserved
  // 0b1000010 -> reserved
  // 0b1000011 -> reserved
  // 0b1000100 -> reserved
  // 0b1000101 -> reserved
  // 0b1000110 -> reserved
  // 0b1000111 -> reserved
  // 0b1001000 -> reserved
  // 0b1001001 -> reserved
  // 0b1001010 -> reserved
  // 0b1001011 -> reserved
  // 0b1001100 -> reserved
  // 0b1001101 -> reserved
  // 0b1001110 -> reserved
  // 0b1001111 -> reserved
  // 0b1010001 -> reserved
  // 0b1010010 -> reserved
  // 0b1010011 -> reserved
  // 0b1010100 -> reserved
  // 0b1010101 -> reserved
  // 0b1010110 -> reserved
  // 0b1010111 -> reserved
  // 0b1011000 -> reserved
  // 0b1011001 -> reserved
  // 0b1011010 -> reserved
  // 0b1011011 -> reserved
  // 0b1011100 -> reserved
  // 0b1011101 -> reserved
  // 0b1011110 -> reserved
  // 0b1011111 -> reserved
  // 0b1100000 -> reserved
  // 0b1100001 -> reserved
  // 0b1100010 -> reserved
  // 0b1100011 -> reserved
  // 0b1100100 -> reserved
  // 0b1100101 -> reserved
  // 0b1100110 -> reserved
  // 0b1100111 -> reserved
  // 0b1101000 -> reserved
  // 0b1101001 -> reserved
  // 0b1101010 -> reserved
  // 0b1101011 -> reserved
  // 0b1101100 -> reserved
  // 0b1101101 -> reserved
  // 0b1101110 -> reserved
  // 0b1101111 -> reserved
  // 0b1110001 -> reserved
  // 0b1110010 -> reserved
  // 0b1110011 -> reserved
  // 0b1110100 -> reserved
  // 0b1110101 -> reserved
  // 0b1110110 -> reserved
  // 0b1110111 -> reserved
  // 0b1111000 -> reserved
  // 0b1111001 -> reserved
  // 0b1111010 -> reserved
  // 0b1111011 -> reserved
  // 0b1111100 -> reserved
  // 0b1111101 -> reserved
  // 0b1111110 -> reserved
  // 0b1111111 -> reserved

  // Send commands (always start with 1, those start with 0 are reserved for the 'wait for data' signals):
  // 0b1111111 -> ready
  // 

  Serial.write(0b11111111);

  while (true) {
    uint8_t b = 0;
    //Serial1.readBytes(&b, 1);
    Serial.readBytes(&b, 1);

    if (b & 0b10000000) {
      // Special commands
    } else {
      // Monster commands
      bool on = b & 0b01000000;
      switch (b & 0b00111111) {
        case 1:
          P1(on);
          break;
        case 2:
          P2(on);
          break;
        case 3:
          P3(on);
          break;
        case 4:
          P4(on);
          break;
        case 5:
          P5(on);
          break;
        case 6:
          P6(on);
          break;
        case 7:
          P7(on);
          break;
        case 8:
          P8(on);
          break;
        case 9:
          P9(on);
          break;
        case 10:
          P10(on);
          break;

        case 11:
          A1(on);
          break;
        case 12:
          A2(on);
          break;
        case 13:
          A3(on);
          break;
        case 14:
          A4(on);
          break;
        case 15:
          A5(on);
          break;
        case 16:
          A6(on);
          break;
        case 17:
          A7(on);
          break;
        case 18:
          A8(on);
          break;
        case 19:
          A9(on);
          break;
        case 20:
          A10(on);
          break;

        case 21:
          X1(on);
          break;
        case 22:
          X2(on);
          break;
        case 23:
          X3(on);
          break;
        case 24:
          X4(on);
          break;
        case 25:
          X5(on);
          break;
        case 26:
          X6(on);
          break;
        case 27:
          X7(on);
          break;
        case 28:
          X8(on);
          break;
        case 29:
          X9(on);
          break;
        case 30:
          X10(on);
          break;

        case 31:
          Door(on);
          break;
        case 32:
          Garbage(on);
          break;

        default:
          Serial.write(0b00000000);
          break;
      }
    }
  }
}