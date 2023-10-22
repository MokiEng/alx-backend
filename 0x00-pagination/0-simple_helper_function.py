#!/usr/bin/env python3
"""a module that implement the index_range function
"""
from typing import Tuple


def index_range(page: int, page_size: int) -> tuple:
    """Return a tuple of the start and end index for a given page
    and page_size.
    """
    if page <= 1:
      start = 0
    else:
      start = (page - 1) * page_size
    end = start + page_size
    return start, end
