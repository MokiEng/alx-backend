#!/usr/bin/env python3
"""FIFOCache module."""
from collections import OrderedDict

from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """FIFOCache defines a caching system using the FIFO algorithm.
    It has a limit of `BaseCaching.MAX_ITEMS` on
    the number of items it can store.
    """
    def __init__(self):
        """Initialize FIFOCache.
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """Adds an item in the cache.
        """
        if key is None or item is None:
            return
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            first_key, _ = self.cache_data.popitem(False)
            print("DISCARD:", first_key)

    def get(self, key):
        """Get an item by key."""
        return self.cache_data.get(key, None)
