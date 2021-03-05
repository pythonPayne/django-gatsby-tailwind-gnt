import time
import pandas as pd
import json
import sqlite3
import pandas as pd

conn = sqlite3.connect(
    '/Users/stephen/Desktop/github/django-gatsby-tailwind-gnt/django-app/db.sqlite3')
# cursor = conn.cursor()
# cursor.execute("DROP TABLE gnt_bcvindex")
# cursor.execute("DROP TABLE gnt_morphology")
# cursor.execute("DROP TABLE gnt_strongs")
# cursor.execute("DROP TABLE gnt_word")
# conn.commit()
# print("Tables dropped... ")

bookList = ['Jhn', ]
###########################################################################
# BcvIndex
###########################################################################
df = pd.read_pickle(
    '/Users/stephen/Desktop/github/django-gatsby-tailwind-gnt/django-app/gnt/pickles/tantt.pkl')
df = df[df['BOOK'].isin(bookList)]
groups = ['BOOK', 'BOOK_NUM', 'CHAPTER', 'VERSE']
dg = df.groupby(groups).count().reset_index()[groups]
dg.BOOK_NUM = dg.BOOK_NUM.astype(int)
dg.BOOK_NUM = dg.BOOK_NUM-40
# dg['BOOK_NUM'] = dg['BOOK']
# d = {'1Co': 7, '1Jn': 23, '1Pe': 21, '1Th': 13, '1Ti': 15, '2Co': 8,
#      '2Jn': 24, '2Pe': 22, '2Th': 14, '2Ti': 16, '3Jn': 25, 'Act': 5,
#      'Col': 12, 'Eph': 10, 'Gal': 9, 'Heb': 19, 'Jas': 20, 'Jhn': 4,
#      'Jud': 26, 'Luk': 3, 'Mat': 1, 'Mrk': 2, 'Phm': 18, 'Php': 11,
#      'Rev': 27, 'Rom': 6, 'Tit': 17}
# dg = dg.replace({"BOOK_NUM": d})
dg = dg.sort_values(by=['BOOK_NUM', 'CHAPTER', 'VERSE'], ascending=True)

dg["BOOK_NUM_STR"] = dg.BOOK_NUM.apply(
    lambda x: '0'+str(x) if x < 10 else str(x))
dg["CHAPTER_STR"] = dg.CHAPTER.apply(
    lambda x: '0'+str(x) if x < 10 else str(x))
dg["VERSE_STR"] = dg.VERSE.apply(lambda x: '0'+str(x) if x < 10 else str(x))
dg["BCV"] = dg.BOOK_NUM_STR + dg.CHAPTER_STR + dg.VERSE_STR

# dg['BCV'] = dg['BOOK'] + "-" + \
#     dg['CHAPTER'].astype(str) + "-" + dg['VERSE'].astype(str)

# dg["id"] = dg.index
dg = dg.rename(columns={
    "BCV": "bcv",
    "BOOK": "book",
    "CHAPTER": "chapter",
    "VERSE": "verse"
})
dg = dg[["bcv", "book", "chapter", "verse"]].sort_values(by='bcv')
dg.to_sql('gnt_bcvindex', conn, if_exists='replace', index=False)
print("BcvIndex done")
###########################################################################
# Morphology
###########################################################################
df = pd.read_pickle(
    '/Users/stephen/Desktop/github/django-gatsby-tailwind-gnt/django-app/gnt/pickles/tegmc.pkl')
# df["id"] = df.index
df = df.rename(columns={
    "MORPHOLOGY": "morphology",
    "FUNCTION": "function",
    "TENSE": "tense",
    "VOICE": "voice",
    "MOOD": "mood",
    "PERSON": "person",
    "CASE": "case",
    "GENDER": "gender",
    "NUMBER": "number"
})
df = df[["morphology", "function", "tense", "voice",
         "mood", "person", "case", "gender", "number"]]
df.to_sql('gnt_morphology', conn, if_exists='replace', index=False)
print("Morphology done")

###########################################################################
# Strongs
###########################################################################
df = pd.read_pickle(
    '/Users/stephen/Desktop/github/django-gatsby-tailwind-gnt/django-app/gnt/pickles/tbesg.pkl')
# df["id"] = df.index
df = df.rename(columns={
    "STRONGS": "strongs",
    "LEXICON": "lexicon",
    "GLOSS": "gloss",
    "TRANSLITERATION": "transliteration",
    "FREQUENCY": "frequency"
})
df = df[["strongs", "lexicon", "gloss", "transliteration", "frequency"]]
df.to_sql('gnt_strongs', conn, if_exists='replace', index=False)
print("Strongs done")

###########################################################################
# Word
###########################################################################
df = pd.read_pickle(
    '/Users/stephen/Desktop/github/django-gatsby-tailwind-gnt/django-app/gnt/pickles/tantt.pkl')
df = df[df['BOOK'].isin(bookList)]
df.BOOK_NUM = df.BOOK_NUM.astype(int)
df.BOOK_NUM = df.BOOK_NUM-40
df["BOOK_NUM_STR"] = df.BOOK_NUM.apply(
    lambda x: '0'+str(x) if x < 10 else str(x))
df["CHAPTER_STR"] = df.CHAPTER.apply(
    lambda x: '0'+str(x) if x < 10 else str(x))
df["VERSE_STR"] = df.VERSE.apply(lambda x: '0'+str(x) if x < 10 else str(x))
df["BCV"] = df.BOOK_NUM_STR + df.CHAPTER_STR + df.VERSE_STR

df["id"] = df.index
df = df.rename(columns={
    "GREEK": "greek",
    "ENGLISH": "english",
    "BCV": "bcvIndex_id",
    "MORPHOLOGY": "morphology_id",
    "STRONGS": "strongs_id"
})

df = df[["id", "greek", "english", "bcvIndex_id", "morphology_id", "strongs_id"]]
df.to_sql('gnt_word', conn, if_exists='replace', index=False)
print("Word done")

# conn.close()
