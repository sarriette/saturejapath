#!/bin/bash

# Synchroniser GitHub
git add .
git commit -m "automatic website updates"
git push origin main

# Synchroniser Neocities
neocities-sync sync . --ignore-disallowed-file-types --state .neocities_state
