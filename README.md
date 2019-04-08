# [실행 방법]

```
git clone https://github.com/ghwlchlaks/interview-cafe24.git
cd interview-cafe24
npm isntall
npm start
http://localhost:3000 접속
```

# [개발 도구]

1. 개발 도구
   - React.js
   - VSCode
   - eslint + prettier

# [주요 기능]

1. 검색 기능
   > 과목 이름을 이용하여 필터링  
   > 요일을 이용하여 필터링  
   > 전공/ 교양 필터링  
   > 학점에 따른 필터링
2. 과목 리스트 뷰
   > 선택가능한 과목/ 선택한 과목 분리  
   > 과목에 대한 상세 (모달)
   > 과목에대한 정보 테이블 표시  
   > 과목 리스트 추가/ 삭제 기능  
   > 선택한 총 학점 표시  
   > 18 <= 학점 <= 21 (버튼 비활성화, alert표시)
3. 결과 창
   > 결과 시간표 테이블 표시  
   > pagination으로 결과 나누기  
   > 필터링(공강 있는날 / 오전 수업없는날)  
   > 시간표 클릭시 상세 시간표 표시(모달)  
   > 시간표 과목 클릭시 과목 상세 (모달)  
   > 상세 시간표 모달창에서 '시간표 내려받기' 클릭시 시간표 이미지 내려받기

# [개발 회고 코멘트]

대표적으로 2가지.

1. Try (시도)
   > 수많은 결과테이블을 어떻게 보여줘야할지 고민, 일정 부분만 보여주고 상세 내용은 클릭을 통해서 사용자에게 보여주자는 의도.  
   > 대학생들이 시간표를 보고 선택한 시간표를 저장하는 기능이 필요하다고 생각하여 기능 추가
2. Problem (아쉬웠던점)
   > 결과 테이블을 깔끔하게 표현하지 못한 아쉬움.  
   > 잦은 렌더링 작업처리를 못한점.

# [데이터 구조]

```
[{
no: number
title: string,
grades: number,
times: array,
description: string,
books: string,
type: number,
room: number,
professor: string
}]

> no - 과목코드
> Title - 과목 이름
> Grades - 학점
> Times - 수업 시간
> Description - 수업 설명글
> Books - 교재 이미지 주소
> type - 전공 / 교양
> room - 강의실
> Professor - 교수님 성함

예)
{
"no": 1,
"title": "C언어",
"grades": 3,
"times": [[1, 2], [19, 20], [39, 40]],
"description": "C언어 재밌게 배웁시다",
"books": "img/C.png",
"type": 0,
"room": 401,
"professor": "choi"
},
```

# [주요 코드]

1.  가능한 모든 시간표 구하기  
    => [[a, a+1], [b, b+1], [c, c+1]] 수업시간이라 가정. - 가능한 수업 시간 3가지 종류 중 3학점 수업은 2개를 선택, 1~2학점 수업은 1개를 선택하는 경우의 수(배열)를 구함. (배열과 양의 정수를 매개변수로 받는 함수)

    ```
    [의사코드]
    function getCombination(arr, m) {
    Combination = []; //모든 경우의 수 저장
    picked = [] // 선택한 인덱스 저장
    used = []
       for (item of arr) used.push(0); //배열 초기화 같은요소 추가 방지
           function find(picked) {
               if  (picked.lengh === m) // 선택한 배열의 길이와 m이 같다면
                   // 선택한 인덱스의 값을 저장
                       Combination.push()
               else  // 덜 선택됐다면{
                       // 선택하지 않은 인덱스 추가(재귀호출)
               For (0 ~ arr.length);
                   Find(picked)
               }
           }
           return combination //저장한 배열 리턴
       }
    ```

    ```
    [코드]
    function getAllCombinations(arr, m) {
    const combinations = [];
    const picked = [];
    const used = [];
    for (item of arr) used.push(0);

    function find(picked) {
      if (picked.length === m) {
        let rst = [];
        for (let i of picked) {
          rst = rst.concat(arr[i])
        }
        combinations.push(rst);
        return;
      } else {
        let start = picked.length ? picked[picked.length-1] + 1 : 0;
        for (let i = start; i < arr.length; i++) {
          if (i === 0 || arr[i] !== arr[i-1] || used[i-1]) {
            picked.push(i);
            used[i] = 1;
            find(picked);
            picked.pop();
            used[i] = 0;
          }
        }
      }
    }
    find(picked);
    return combinations;
    }
    ```

2.  (1)에서 구한 경우의 수(arr)를 이용하여 조합할 수 있는 모든 경우의 수를 구함

    ```
    [의사코드]
    function getSchedule(arr, 빈배열, 빈배열, index) {
       If (arr.length === index)  {
       //모든 배열의 인덱스를 재귀했으면 종료
       return data;
       }

       for (0 ~ arr[I] ) {
           data.concat(arr[i]) // 만든 배열과 현재 수업시간 배열을 합침
       }

       If (data배열 중복이 없다면) data배열 중복검사 {
           getSchedule(arr, data, data1, index+1) // 재귀호출
       }
    }
    ```

    ```
    [코드]
    function recursive(arr, data, data1, index) {
        let firsts;
        if (arr[index]) {
            firsts = arr[index].times_combination
        }

        if (arr.length === index) {
            newArr.push(data)
            return data;
        }

        for (let i in firsts) {
            const b = data1.concat(firsts[i])
            const a = data.concat({
                ...arr[index],
                enable_times: firsts[i]
            })

            let isDuplicated = false;

            // 중복 검사
            for (let j=0; j< b.length; j++) {
                for (let q=j+1; q<b.length; q++) {
                    if (b[j]=== b[q]) {
                        isDuplicated = true;
                        break;
                    }
                }
            }

            if (!isDuplicated) {
                recursive(arr, a, b, index+1)
            }

        }
    }
    ```
