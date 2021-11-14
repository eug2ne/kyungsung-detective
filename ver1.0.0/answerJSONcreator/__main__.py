import random
import encoder
import utils

def __init__(dict):
    # dict: { 'word':(row, col), ...}
    # return { 'word':'encoded str', ...}
    c = (15-dict.value()[0])//2 # col >> c진수로 encoding
    if dict.key()[0] == 0:
        r = c # row >> r진수로 encoding (row.index == 0에서 시작하면 col과 같은 진수로 encoding)
    else:
        r = None

    for word in dict.key():
        row, col = dict[word][0], dict[word][1]

        encoded_str = encoder.colEncoder(col,c) + encoder.rowEncoder(row,r)
        dict[word] = encoded_str

    return dict