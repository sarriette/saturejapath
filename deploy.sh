#!/bin/bash

# Synchroniser GitHub
git add .
git commit -m "automatic website updates"
git push origin main

# Synchroniser Neocities
neocities psuh .
