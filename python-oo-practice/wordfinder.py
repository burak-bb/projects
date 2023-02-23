"""Word Finder: finds random words from a dictionary."""

import random

class WordFinder:
    ...
    def __init__(self, path):
        self.path = path
        self.words = []
        with open(self.path, "r") as file:
            for line in file:
                word = line.strip()
                if word:
                    self.words.append(word)



    def random(self):
        return random.choice(self.words)
    
