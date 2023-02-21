def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    num1_str = str(num1)
    num2_str = str(num2)

    common_digits = set(num1_str) & set(num2_str)

    for digit in common_digits:
        if num1_str.count(digit) != num2_str.count(digit):
            return False

    return True