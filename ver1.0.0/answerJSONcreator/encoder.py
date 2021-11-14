import random
import utils

def rowEncoder(row, r = None):
    if r == None:
        r = random.randint(0,9)

    if row < 3:
        # n진수로 표현
        row_encode = utils.Convert(row, r)

    else:
        # 15-n진수의 보수로 표현
        row_encode = utils.Convert(row, r)

        for n in len(row_encode):
            x = row_encode.pop(n)
            x = utils.tmp[(14-r) - int(x)]

            row_encode = row_encode + x

    return row_encode

def colEncoder(col, c):
    if col%2 == 0:
        # if col even
        col_encode = utils.Convert((14-col)//2, c)
        col_encode = col_encode + "0"

    else:
        # if col odd
        col_encode = utils.Convert((14-col)//2, c)
        col_encode = col_encode + "1"

    return col_encode