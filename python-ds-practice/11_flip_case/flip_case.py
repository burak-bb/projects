def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """

    out = ""
    swap = to_swap.swapcase()
    for letter in phrase:
        if letter == to_swap or letter == swap:
            letter = letter.swapcase()
        out += letter
    return out