# scraper/run_scraper.py
import os, json, time, random
from scraper.fetcher import fetch_product_jadeship

AFFIL = os.environ['AFFIL_CODE']  # à configurer en Secret GitHub

# 1) Charger le JSON existant
with open('jadeship_products.json', encoding='utf-8') as f:
    products = json.load(f)

updated = []
for p in products:
    info = fetch_product_jadeship(p['source'])  # titre, supplier, id, source_url
    # Mettre à jour les champs dynamiques
    p.update({
        'title':      info['title'],
        'platform':   info['supplier'],
        'id':         info['article_id'],
        'source':     info['source_url'],
        'cnfans_link': (
          f"https://cnfans.com/product?"
          f"platform={info['supplier']}"
          f"&id={info['article_id']}"
          f"&ref={AFFIL}"
        )
    })
    updated.append(p)
    time.sleep(random.uniform(2,5))

# 2) Réécrire le fichier JSON
with open('jadeship_products.json', 'w', encoding='utf-8') as f:
    json.dump(updated, f, ensure_ascii=False, indent=2)
