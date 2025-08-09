---
layout: single
title: "Python OpenCV 시작해보기 2"
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

OpenCV에서 CUDA 기능을 사용하려면 CUDA 툴킷을 설치하고 OpenCV 소스코드를 직접 빌드해야 합니다. 특히 최신 버전을 사용하려면요. 어제 실패한 간단한 방법을 포기하고 다시 설치를 해보겠습니다.

### 1.1. 설치 순서
1. Visual Studio Community 2022에 C++ 데스크톱 개발 설치
2. OpenCV 4.10.0 소스코드 다운로드 및 압축해제 [링크](https://github.com/opencv/opencv)
3. OpenCV_contrib 4.10.0 소스코드 다운로드 및 압출해제 [링크](https://github.com/opencv/opencv_contrib)
4. CUDA Toolkit 설치 [링크](https://developer.nvidia.com/cuda-toolkit)
5. cuDNN 설치 [링크](https://developer.nvidia.com/cuda-toolkit)
6. CMake 설치 [링크](https://cmake.org/download/)

### 1.2. Python 설정
파이썬에는 numpy 2.x 가 설치되어 있어야 합니다.

### 1.3. OpenCV 압축풀기
C:\opencv_prebulid 라는 이름으로 폴더를 생성합니다.

그리고, 1.1. 의 2와 3에서 받은 opencv와 opencv_contrib를 압축해제 해서 C:\opencv 폴더 안에 위치시킵니다. 그리고 같은 위치에 build와 cmake라는 폴더도 만듭니다. 


CMake(cmake-gui)를 실행합니다.

![cmake1](/images/2025-08-03-python-opencv2/img_20250804_002.png)


위와 같이 `Where is the source code` 위치와 `Where to build the binaries` 위치를 설정하고 아래의 Configure 버튼을 클릭합니다. 

<img src="/images/2025-08-03-python-opencv2/img_20250804_003.png" width="400" alt="cmake2">

팝업되는 창에서는 내용을 그대로 두면 됩니다. 설치된 Visual Studio 버전만 맞춰주면 되겠습니다. 저같은 경우는 Visual Studio 17 2022 Community Edition 이므로 그대로 둡니다. 그리고 Finish 버튼을 클릭하면 됩니다. 시간은 좀 걸리니 인내심을 가지세요.

<img src="/images/2025-08-03-python-opencv2/img_20250804_004.png" width="800" alt="cmake3">

작업이 완료되면 아래와 같이 위는 붉은 색으로 나오고 아래에 여러 로그가 출력된 상태로 완료됩니다. 

![cmake4](/images/2025-08-03-python-opencv2/img_20250804_005.png)

### 1.4. CMake 빌드 설정

위의 붉은 부분은 옵션 선택으로 OpenCV에서 현재 필요한 설정들을 추가할지 제거할지 선택할 수 있습니다. 

- BUILD_EXAMPLES : 말 그대로 예제 파일들인데 이를 선택하면 빌드 시간이 오래 걸립니다. 선택하지 않습니다.
- OPENCV_DNN_CUDA, WITH_CUD : value 체크
- BUILD_opencv_world : 서브라이브러리들이 하나의 dll로 만들어 집니다.
- tests * 포함딘 목록 : 대부분 해제 합니다.
- OPENCV_EXTRA_MODULES_PATH : opencv_contrib 아래 modules 폴더까지 선택합니다.
- CMAKE_INSTALL_PREFIX : C:/opencv/build410 로 변경합니다.
- BUILD_JAVA, BUILD_opencv_java, BUILD_opencv_java_bindings_generator 를 모두 해제 합니다. 자바는 만들지 않습니다.

위의 BUILD_opencv_world 를 체크하고 진행을 했더니, 솔루션 빌드시 오류가 나더군요. 그래서 제거했습니다. 이렇게 한 상태에서 다시 Configure 버튼을 클릭합니다.

실패를 했는데 이유를 보니 cuDNN을 복사하면서 CUDA Toolkit 경로로 옮겼는데 경로가 앉맞았던 것 같습니다. 그래서 다 아래의 표 처럼 위치를 옮겼습니다.

| cuDNN 경로                                              | → 복사 대상 CUDA 경로                                          |
| ------------------------------------------------------- | --------------------------------------------------------------- |
| `C:\Program Files\NVIDIA\CUDNN\v9.11\bin\cudnn64_*.dll` | `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.9\bin\` |
| `...\include\cudnn*.h`                                  | `...\CUDA\v12.9\include\`                                       |
| `...\lib\x64\cudnn.lib`                                 | `...\CUDA\v12.9\lib\x64\`                                       |


### 1.5. 실패 이유

<img src="/images/2025-08-03-python-opencv2/img_20250805_006.png" width="600">

계속 cuDNN에서 실패를 했는데 문제는 이게 아니었습니다. Enviroment Editor에서 
- CUDNN_INCLUDE_DIR : C:/Program Files/NVIDIA/CUDNN/v9.11/include
- CUDNN_LIBRARY : C:/Program Files/NVIDIA/CUDNN/v9.11/lib/12.9/x64/cudnn.lib

그런데 delete cache를 하면 위의 목록은 사라지는데요. 어쩐지 CUDA Toolkit에 복사한 cuDNN이 인식이 됩니다. 


를 넣어줘야 하구요. 실패한 뒤에는 File > Delete Cache를 한 뒤 다시 실행해주는 것이 좋습니다. 그러면 성공! 합니다. 이제 Generate 버튼을 클릭합니다.
그러면, OpenCV.sln 파일이 생성됩니다.

<img src="/images/2025-08-03-python-opencv2/img_20250805_007.png">

Visual Studio에서 오픈 한뒤 Debug를 Release로 변경한 뒤 솔루션 빌드 합니다. 이제 오류가 없으면 빌드하는데 3시간 가량 걸린답니다.

![cmake7](/images/2025-08-03-python-opencv2/img_20250805_008.png)

아! 다시 Configure를 실행한 뒤에는 위의 목록에 빨란 부분이 나타나면 안됩니다!! 근데 저는 계속 나타났거든요. Configure 후에 로그에 나타나는 빨간색 오류와 관련된 옵션을 제거해 줘야 합니다!

![cmake8](/images/2025-08-03-python-opencv2/img_20250805_009.png)

이런 오류가 나오면 CMake Search에서 이 둘을 찾아 value를 체크해제 해줘야 합니다. 이제 알았네요.

다시 Configure 후 위 목록 영역에 빨간 부분이 없으면 성공한 겁니다.

![cmake9](/images/2025-08-03-python-opencv2/img_20250805_012.png)

이제 Generate로 프로젝트를 생성합니다. 끝나면 Open Project를 눌러서 OpenCV.sln을 실행합니다.

### 1.6. 성공 사례

현재 진행 중인 빌드 목록입니다.

1. Python 3.9.13 설치
2. Visual Studio Community 2022에 C++ 데스크톱
3. OpenCV 4.10.0 소스코드 다운로드 및 압축해제
4. OpenCV_contrib 4.10.0 소스코드 다운로드 및 압출해제
5. CUDA Toolkit 12.5 설치
6. cuDNN 9.2.1 설치
7. CMake 3.28.6 설치

CUDA를 12.9 까지 올려서 했더니 컴파일 옵션에 여러가지 문제가 발생하구요, `CUDA_NVCC_FLAGS=--expt-relaxed-constexpr` 와 같은 문제가 발생하네요. OpenCV 4.12 문제는 아닌 것 같습니다. 무조건 최신 버전이 좋은건 아니네요. 일단, 현재 4.10에서 성공을 하고 나면 OpenCV 4.12로 테스트를 다시 해볼 생각입니다. 빌드 시간은 거의 3시간 정도 걸릴 겁니다.

![cmake10](/images/2025-08-03-python-opencv2/img_20250806_003.png)

와, 이틀만에 성공했습니다!! 빌드시간 2시간 18분이 걸렸습니다. 이제는 OpenCV 4.12로 다시 해봐야 겠네요. 그리고 with CUDA를 선택하지 않으면 빌드가 진짜 빨리 끝납니다.


### 1.7. 개발구성 및 테스트

이 이후로 다시 Open 4.12로 테스트 해봤는데요. 3시간 10분이 걸려서 빌드되었고 INSTALL 까지 했습니다.

모두 완료하고 나서 C:\opencv\build412 로 전체 빌드완료한 파일들을 옮기려고 합니다. 솔루션의 CMakeTargets 아래에 INSTALL 프로젝트를 빌드합니다. INSTALL을 해야 Python OpenCV가 설치됩니다. 이때 INSTALL 프로젝트를 시작프로젝트로 설정을 하고 빌드를 시작합니다. 한 15초 정도 밖에 안걸리는 게 빌드된 걸 C:\opencv\build412 로 옮기기만 하기 때문입니다.

이제 sysdm.cpl로 시스템 등록정보에 들어와 고급 > 환경 변수 버튼을 클릭합니다. 

- OPENCV_DIR = C:\opencv\build412 추가
- Path에 %OPENCV_DIR%\x64\vc17\bin 추가

이제 콘솔창에서 아래와 같이 입력해봅니다.

```shell
PS C:\Users\HugoSung> opencv_version
4.12.0
PS C:\Users\HugoSung>
```

이러면 성공입니다! 다음 Python을 해보죠.

```python
PS C:\Users\HugoSung> python
Python 3.9.13 (tags/v3.9.13:6de2ca5, May 17 2022, 16:36:42) [MSC v.1929 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import cv2
>>> cv2.__version__
'4.12.0'
>>> cv2.cuda.getCudaEnabledDeviceCount()
1
```

getCudaEnabledDeviceCount()의 결과가 1이면 CUDA가 동작한다는 뜻입니다. 드디어, 이틀 반만에 성공했네요. 그리고 어떻게 해야 하는지도 다 파악했습니다. 다음 번엔, Visual Studio Ninja를 사용해서 빌드시간을 확 줄여보겠습니다. 끝!

