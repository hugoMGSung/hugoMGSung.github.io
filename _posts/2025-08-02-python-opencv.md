---
layout: single
title: "Python OpenCV 시작해보기"
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

랩탑을 다시 설치하고 나서 지난번 레노버 랩탑에선 파이토치 CUDA는 잘 되었는데, OpenCV CUDA는 계속 실패했었거든요. 그래서, 이번엔 설치를 해보겠습니다. Python OpenCV는 pip로 간단히 설치는 가능하지만 GPU를 사용할 수가 없죠.

OpenCV는 C++기반으로 된 이미지와 영상 처리 오픈소스 라이브러리입니다. NVIDIA CUDA를 지원하고 있는데요. 제대로 안되는 경우가 많아서 고민이었습니다.
빌드파일을 생성해야 하는데 실패하는 경우가 너무 많아서 짜증나더라구요.

쉬운 방법을 찾다가 드디어 그 초간단한 방법을 알게 되어서 같이 공유합니다.

|구분|명세|
|:--|:--|
|CPU|Intel Core Ultra 7|
|RAM|DDR5 64GB|
|GPU|NVIDIA GeForce RTX 4060 Laptop|
|OS|Window 11 Pro|

### 1.1. CUDA Install

CUDA 부터 설치를 해야 합니다. 

[Cuda](https://developer.nvidia.com/cuda-downloads?target_os=Windows&target_arch=x86_64&target_version=11&target_type=exe_local) 에서 

Windows / x86_64 / 11 / exe(local) 순으로 선택하고 3.3GB 용량의 CUDA Toolkit Installer를 다운로드 합니다.

![CUDA_Down](/images/2025-08-02-python-opencv/img_20250802_005.png)

설치하면 됩니다. 시간이 많이 걸리긴 해요.

### 1.2. cuDNN Install

[cuDNN](https://developer.nvidia.com/cudnn-downloads?target_os=Windows&target_arch=x86_64&target_version=11&target_type=exe_local) 에서 위와 동일하게 선택한 뒤 cuDNN 9.11을 다운로드하고, 설치합니다. cuDNN은 금방 설치가 끝나요.

다음은 cuDNN의 폴더를 CUDA로 옮겨줍니다. 이 작업을 해야해요.

![cuDNN_Move](/images/2025-08-02-python-opencv/img_20250802_006.png)

### 1.3. Build file DN

[GitHub](https://github.com/cudawarped/opencv-python-cuda-wheels/releases) 링크입니다.
cudawarped 라는 닉네임의 깃허버(!)의 리포지토리에 있는데요. 2023년 부터 배포를 하셨네요.

최신 버전이 4.12.0.88 입니댜.

![cudawarped_release](/images/2025-08-02-python-opencv/img_20250802_007.png)


### 1.4. PIP 설치

위에서 받은 opencv_contrib_python*.whl이 존재하는 폴더에서 pip 명령어로 실행하면 됩니다.

```shell
> pip install opencv_contrib_python-4.12.0.88-cp37-abi3-win_amd64.whl
```

하지만, 글로벌 Python에 설치를 하면 좀 문제가 있을 수 있겠죠. 그래서, OpenCV용 가사환경을 하나 만들고 여기서 테스트 해보겠습니다.

#### 1.4.1. 파이썬 가상환경

가상환경을 만듭니다.

```shell
> python -m venv venv-opencv
```

가상환경을 실행합니다.

```shell
> venv-opencv\Script\activate
> .\venv-opencv\Scripts\activate
```

그리고 위의 pip 명령어를 입력, 설치합니다.

![opencv_CUDA](/images/2025-08-02-python-opencv/img_20250802_009.png)

엥? 너무 빨리 설치가 완료됩니다. 이상한데요?? 그렇지만 설치가 성공했으니 결과를 확인해봐야겠죠?

```python
Python 3.9.13 (tags/v3.9.13:6de2ca5, May 17 2022, 16:36:42) [MSC v.1929 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import sys
>>> sys.executable
'D:\\01_Programming\\131_Hugo_NeedArrange\\hugo-opencv\\venv-opencv\\Scripts\\python.exe'
>>>
```

음... 일단 가상환경은 맞습니다. 버츄얼 리알리티! 다음 OpenCV를 확인해봅시다.

```python
>>> import cv2
>>> cv2.cuda.getCudaEnabledDeviceCount()
```

실패입니다!! 이런!! ㅠㅠ;
이제 다시 다른 방법을 찾아보겠습니다. 그럼, 이만...