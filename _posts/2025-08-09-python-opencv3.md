---
layout: single
title: "Python OpenCV 시작해보기 3"
categories: python
tag: python
toc: true
toc_sticky: true
toc_label: "목차"
author_profile: false
sidebar:
    nav: "counts"
---

## 1. Python + OpenCV Cuda

문제는 다른 곳에서 발생했습니다. OpenCV 4.12를 CUDA 12.5로 빌드하고 거기다가 Pytorch CUDA 최소사양인 CUDA 12.6 으로 설치를 했더니 Pytorch 자체는 12.6을 설치할 필요가 없지만, OpenCV CUDA 12.5와 Pytorch CUDA 12.6이 바로 충돌이 나더군요.

방법은 OpenCV를 CUDA 12.6으로 빌드해서 설치한 뒤 Pytorch를 CUDA 12.6으로 설치해야 한다는 겁니다.

### 1.1. OpenCV 4.12 CUDA Toolkit 12.6 빌드

현재 빌드를 진행 중인데 시간이 더 많이 걸리는 것 같습니다. 우선 빌드 시간이 얼마나 걸릴지 확인해 봐야겠죠.

3시간 9분 걸렸다는데 그거보다 더 걸린거 같아요. 

### 1.2. Pytorch CUDA 12.6

Pytorch도 12.6으로 설치해야 할 거 같습니다.

```shell
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu126
```

### 1.3. Check

OpenCV 4.12 CUDA와 Pytorch CUDA 를 전부 확인합니다.

```python
PS C:\Users\HugoSung> python
Python 3.9.13 (tags/v3.9.13:6de2ca5, May 17 2022, 16:36:42) [MSC v.1929 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import cv2
>>> cv2.cuda.getCudaEnabledDeviceCount()
1
>>> import torch
>>> torch.cuda.is_available()
True
>>> torch.cuda.get_device_name(0)
'NVIDIA GeForce RTX 4060 Laptop GPU'
>>>

```