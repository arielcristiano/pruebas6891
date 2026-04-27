"""
Punto de entrada de la aplicación Calculadora.
Interfaz de línea de comandos (CLI).
"""

from app.calculadora import Calculadora  # Importa la clase Calculadora desde el módulo app


def mostrar_menu():  # Función para mostrar el menú principal de opciones
    print("\n╔══════════════════════════╗")  # Imprime la línea superior del menú
    print("║     CALCULADORA PYTHON   ║")  # Imprime el título del menú
    print("╠══════════════════════════╣")  # Imprime la línea separadora
    print("║  1. Sumar                ║")  # Opción 1: suma
    print("║  2. Restar               ║")  # Opción 2: resta
    print("║  3. Multiplicar          ║")  # Opción 3: multiplicación
    print("║  4. Dividir              ║")  # Opción 4: división
    print("║  5. Potencia             ║")  # Opción 5: potencia
    print("║  6. Raíz cuadrada        ║")  # Opción 6: raíz cuadrada
    print("║  0. Salir                ║")  # Opción 0: salir del programa
    print("╚══════════════════════════╝")  # Imprime la línea inferior del menú


def main():  # Función principal que controla el flujo del programa
    calc = Calculadora()  # Crea una instancia de la clase Calculadora

    while True:  # Inicia un bucle infinito para mantener la aplicación activa
        mostrar_menu()  # Muestra el menú de opciones
        opcion = input("\nSeleccione una opción: ").strip()  # Obtiene la opción del usuario y elimina espacios en blanco

        try:  # Inicia bloque de control de excepciones
            if opcion == "0":  # Si el usuario presiona 0, sale del programa
                print("¡Hasta luego!")  # Despide al usuario
                break  # Sale del bucle while

            elif opcion in ("1", "2", "3", "4", "5"):  # Si selecciona operación binaria (suma, resta, mult, div, potencia)
                a = float(input("Ingrese el primer número: "))  # Solicita y convierte el primer número a float
                b = float(input("Ingrese el segundo número: "))  # Solicita y convierte el segundo número a float

                if opcion == "1":  # Si eligió sumar
                    resultado = calc.sumar(a, b)  # Calcula la suma de a y b
                    print(f"  {a} + {b} = {resultado}")  # Muestra el resultado
                elif opcion == "2":  # Si eligió restar
                    resultado = calc.restar(a, b)  # Calcula la resta de a y b
                    print(f"  {a} - {b} = {resultado}")  # Muestra el resultado
                elif opcion == "3":  # Si eligió multiplicar
                    resultado = calc.multiplicar(a, b)  # Calcula el producto de a y b
                    print(f"  {a} × {b} = {resultado}")  # Muestra el resultado
                elif opcion == "4":  # Si eligió dividir
                    resultado = calc.dividir(a, b)  # Calcula la división de a entre b
                    print(f"  {a} ÷ {b} = {resultado}")  # Muestra el resultado
                elif opcion == "5":  # Si eligió potencia
                    resultado = calc.potencia(a, b)  # Calcula a elevado a la potencia b
                    print(f"  {a} ^ {b} = {resultado}")  # Muestra el resultado

            elif opcion == "6":  # Si eligió raíz cuadrada
                n = float(input("Ingrese el número: "))  # Solicita y convierte el número a float
                resultado = calc.raiz_cuadrada(n)  # Calcula la raíz cuadrada del número
                print(f"  √{n} = {resultado}")  # Muestra el resultado

            else:  # Si ingresa una opción no válida
                print("  Opción no válida. Intente de nuevo.")  # Muestra mensaje de error

        except ZeroDivisionError as e:  # Captura excepción de división por cero
            print(f"  Error: {e}")  # Muestra el mensaje de error
        except ValueError as e:  # Captura excepción de error de valor (ej: número negativo en raíz)
            print(f"  Error: {e}")  # Muestra el mensaje de error


if __name__ == "__main__":  # Verifica si el script se ejecuta directamente (no como módulo importado)
    main()  # Ejecuta la función principal