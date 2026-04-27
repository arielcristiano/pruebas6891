"""
Módulo principal de la calculadora.
Contiene la lógica de operaciones aritméticas básicas.
"""


class Calculadora:  # Define la clase Calculadora
    """Clase que encapsula las operaciones de una calculadora básica."""

    def sumar(self, a: float, b: float) -> float:  # Método que suma dos números (a y b)
        """Retorna la suma de dos números."""
        return a + b  # Retorna el resultado de la suma

    def restar(self, a: float, b: float) -> float:  # Método que resta dos números (a - b)
        """Retorna la diferencia entre dos números."""
        return a - b  # Retorna el resultado de la resta

    def multiplicar(self, a: float, b: float) -> float:  # Método que multiplica dos números (a * b)
        """Retorna el producto de dos números."""
        return a * b  # Retorna el resultado de la multiplicación

    def dividir(self, a: float, b: float) -> float:  # Método que divide a entre b
        """
        Retorna el cociente de dos números.
        Lanza ZeroDivisionError si el divisor es cero.
        """
        if b == 0:  # Verifica si el divisor es cero
            raise ZeroDivisionError("No se puede dividir por cero.")  # Lanza una excepción si b es cero
        return a / b  # Retorna el resultado de la división

    def potencia(self, base: float, exponente: float) -> float:  # Método que calcula base elevada a exponente
        """Retorna la base elevada al exponente."""
        return base ** exponente  # Retorna el resultado de la potencia

    def raiz_cuadrada(self, n: float) -> float:  # Método que calcula la raíz cuadrada de n
        """
        Retorna la raíz cuadrada de un número.
        Lanza ValueError si el número es negativo.
        """
        if n < 0:  # Verifica si el número es negativo
            raise ValueError("No se puede calcular la raíz cuadrada de un número negativo.")  # Lanza una excepción si n es negativo
        return n ** 0.5  # Retorna la raíz cuadrada (n elevado a 0.5)