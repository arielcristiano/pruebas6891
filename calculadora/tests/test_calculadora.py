"""
Suite de pruebas automatizadas para la Calculadora.
"""

import sys  # Importa el módulo del sistema
import os  # Importa el módulo del sistema operativo
import unittest  # Importa el módulo de pruebas unitarias

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))  # Agrega la ruta padre al path para importar app

from app.calculadora import Calculadora  # Importa la clase Calculadora

class TestSuma(unittest.TestCase):  # Define la clase de pruebas para operaciones de suma
""" def setUp(self):  # Método que se ejecuta antes de cada prueba
        self.calc = Calculadora()  # Crea una instancia de Calculadora para usar en las pruebas

    def test_suma_numeros_positivos(self):  # Prueba la suma de dos números positivos
        """Entrada: 3 + 5 | Resultado esperado: 8"""
        self.assertEqual(self.calc.sumar(3, 5), 8)  # Verifica que 3 + 5 = 8 """
    def test_suma_numero_negativo(self):  # Prueba la suma de un positivo y un negativo
        """Entrada: 10 + (-4) | Resultado esperado: 6"""
        self.assertEqual(self.calc.sumar(10, -4), 6)  # Verifica que 10 + (-4) = 6

    def test_suma_con_cero(self):  # Prueba la suma con cero
        """Entrada: 7 + 0 | Resultado esperado: 7"""
        self.assertEqual(self.calc.sumar(7, 0), 7)  # Verifica que 7 + 0 = 7


class TestResta(unittest.TestCase):  # Define la clase de pruebas para operaciones de resta

    def setUp(self):  # Método que se ejecuta antes de cada prueba
        self.calc = Calculadora()  # Crea una instancia de Calculadora para usar en las pruebas

    def test_resta_resultado_positivo(self):  # Prueba la resta que da resultado positivo
        """Entrada: 10 - 3 | Resultado esperado: 7"""
        self.assertEqual(self.calc.restar(10, 3), 7)  # Verifica que 10 - 3 = 7

    def test_resta_resultado_negativo(self):  # Prueba la resta que da resultado negativo
        """Entrada: 2 - 9 | Resultado esperado: -7"""
        self.assertEqual(self.calc.restar(2, 9), -7)  # Verifica que 2 - 9 = -7

    def test_resta_numeros_iguales(self):  # Prueba la resta de números iguales
        """Entrada: 5 - 5 | Resultado esperado: 0"""
        self.assertEqual(self.calc.restar(5, 5), 0)  # Verifica que 5 - 5 = 0


class TestMultiplicacion(unittest.TestCase):  # Define la clase de pruebas para operaciones de multiplicación

    def setUp(self):  # Método que se ejecuta antes de cada prueba
        self.calc = Calculadora()  # Crea una instancia de Calculadora para usar en las pruebas

    def test_multiplicacion_positivos(self):  # Prueba la multiplicación de dos positivos
        """Entrada: 4 × 5 | Resultado esperado: 20"""
        self.assertEqual(self.calc.multiplicar(4, 5), 20)  # Verifica que 4 × 5 = 20

    def test_multiplicacion_por_cero(self):  # Prueba la multiplicación por cero
        """Entrada: 99 × 0 | Resultado esperado: 0"""
        self.assertEqual(self.calc.multiplicar(99, 0), 0)  # Verifica que 99 × 0 = 0

    def test_multiplicacion_negativos(self):  # Prueba la multiplicación de dos negativos
        """Entrada: (-3) × (-4) | Resultado esperado: 12"""
        self.assertEqual(self.calc.multiplicar(-3, -4), 12)  # Verifica que (-3) × (-4) = 12


class TestDivision(unittest.TestCase):  # Define la clase de pruebas para operaciones de división

    def setUp(self):  # Método que se ejecuta antes de cada prueba
        self.calc = Calculadora()  # Crea una instancia de Calculadora para usar en las pruebas

    def test_division_exacta(self):  # Prueba la división exacta
        """Entrada: 10 ÷ 2 | Resultado esperado: 5.0"""
        self.assertEqual(self.calc.dividir(10, 2), 5.0)  # Verifica que 10 ÷ 2 = 5.0

    def test_division_con_decimales(self):  # Prueba la división con resultado decimal
        """Entrada: 7 ÷ 2 | Resultado esperado: 3.5"""
        self.assertEqual(self.calc.dividir(7, 2), 3.5)  # Verifica que 7 ÷ 2 = 3.5

    def test_division_por_cero_lanza_excepcion(self):  # Prueba que la división por cero lanza excepción
        """Entrada: 5 ÷ 0 | Resultado esperado: ZeroDivisionError"""
        with self.assertRaises(ZeroDivisionError):  # Verifica que se lance ZeroDivisionError
            self.calc.dividir(5, 0)  # Intenta dividir por cero


class TestPotencia(unittest.TestCase):  # Define la clase de pruebas para operaciones de potencia

    def setUp(self):  # Método que se ejecuta antes de cada prueba
        self.calc = Calculadora()  # Crea una instancia de Calculadora para usar en las pruebas

    def test_potencia_entera(self):  # Prueba la potencia con exponente entero
        """Entrada: 2 ^ 3 | Resultado esperado: 8"""
        self.assertEqual(self.calc.potencia(2, 3), 8)  # Verifica que 2 ^ 3 = 8

    def test_potencia_exponente_cero(self):  # Prueba la potencia con exponente cero
        """Entrada: 99 ^ 0 | Resultado esperado: 1"""
        self.assertEqual(self.calc.potencia(99, 0), 1)  # Verifica que 99 ^ 0 = 1 (cualquier número elevado a 0 es 1)

    def test_potencia_exponente_negativo(self):  # Prueba la potencia con exponente negativo
        """Entrada: 2 ^ (-2) | Resultado esperado: 0.25"""
        self.assertEqual(self.calc.potencia(2, -2), 0.25)  # Verifica que 2 ^ (-2) = 0.25


class TestRaizCuadrada(unittest.TestCase):  # Define la clase de pruebas para raíz cuadrada

    def setUp(self):  # Método que se ejecuta antes de cada prueba
        self.calc = Calculadora()  # Crea una instancia de Calculadora para usar en las pruebas

    def test_raiz_cuadrada_perfecta(self):  # Prueba la raíz cuadrada de un número perfecto
        """Entrada: √9 | Resultado esperado: 3.0"""
        self.assertEqual(self.calc.raiz_cuadrada(9), 3.0)  # Verifica que √9 = 3.0

    def test_raiz_cuadrada_de_cero(self):  # Prueba la raíz cuadrada de cero
        """Entrada: √0 | Resultado esperado: 0.0"""
        self.assertEqual(self.calc.raiz_cuadrada(0), 0.0)  # Verifica que √0 = 0.0

    def test_raiz_cuadrada_negativo_lanza_excepcion(self):  # Prueba que la raíz de un negativo lanza excepción
        """Entrada: √(-4) | Resultado esperado: ValueError"""
        with self.assertRaises(ValueError):  # Verifica que se lance ValueError
            self.calc.raiz_cuadrada(-4)  # Intenta calcular la raíz cuadrada de un número negativo


if __name__ == "__main__":  # Verifica si el script se ejecuta directamente
    unittest.main(verbosity=2)  # Ejecuta todas las pruebas con verbosidad nivel 2