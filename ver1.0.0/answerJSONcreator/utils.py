tmp = ["0","1","2","3","4","5","6","7","9","a","b","c","d","e"]

def Convert(num, base):
    # num, base, k: int
    q, r = divmod(num, base)
    if q == 0 :
        return tmp[r] 
    else :
        return Convert(q, base) + tmp[r]
