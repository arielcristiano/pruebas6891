"""
Suite de pruebas automatizadas para la Calculadora.
"""

import sys  # Importa el módulo del sistema
import os  # Importa el módulo del sistema operativo
import unittest  # Importa el módulo de pruebas unitarias

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))  # Agrega la ruta padre al path para importar app

from app.calculadora import Calculadora  # Importa la clase Calculadora

class TestSuma(unittest.TestCase):  # Define la clase de pruebas para operaciones de suma
    def setUp(self):  # Método que se ejecuta antes de cada prueba
        self.calc = Calculadora()  # Crea una instancia de Calculadora para usar en las pruebas

class TestDivision(unittest.TestCase):  # Define la clase de pruebas para operaciones de división

    def setUp(self):  # Método que se ejecuta antes de cada prueba
        self.calc = Calculadora()  # Crea una instancia de Calculadora para usar en las pruebas

    def test_division_con_decimales(self):  # Prueba la división con resultado decimal
        """Entrada: 7 ÷ 2 | Resultado esperado: 3.5"""
        self.assertEqual(self.calc.dividir(7, 2), 3.5)  # Verifica que 7 ÷ 2 = 3.5

    def test_division_por_cero_lanza_excepcion(self):  # Prueba que la división por cero lanza excepción
        """Entrada: 5 ÷ 0 | Resultado esperado: ZeroDivisionError"""
        with self.assertRaises(ZeroDivisionError):  # Verifica que se lance ZeroDivisionError
            self.calc.dividir(5, 0)  # Intenta dividir por cero


class TestRaizCuadrada(unittest.TestCase):  # Define la clase de pruebas para raíz cuadrada

    def setUp(self):  # Método que se ejecuta antes de cada prueba
        self.calc = Calculadora()  # Crea una instancia de Calculadora para usar en las pruebas

    def test_raiz_cuadrada_perfecta(self):  # Prueba la raíz cuadrada de un número perfecto
        """Entrada: √9 | Resultado esperado: 3.0"""
        self.assertEqual(self.calc.raiz_cuadrada(9), 3.0)  # Verifica que √9 = 3.0

if __name__ == "__main__":  # Verifica si el script se ejecuta directamente
    unittest.main(verbosity=2)  # Ejecuta todas las pruebas con verbosidad nivel 2