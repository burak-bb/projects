def print_upper_words(words, must_start_with):
    for word in words:
        for prefix in must_start_with:
            if word.startswith(prefix):
                print(word.upper())
                

# this should print "HELLO", "HEY", "YO", and "YES"

print_upper_words(["hello", "hey", "goodbye", "yo", "yes"], ["h", "y"])