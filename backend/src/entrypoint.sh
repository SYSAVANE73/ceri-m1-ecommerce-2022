#!/bin/sh
echo ${PORT}
uvicorn app.main:app --host "0.0.0.0" --port ${PORT}
