// 冒泡排序
function bubbleSort() {
    var arr = [0,5,33,4,66,88,2,5,11,21,35,10,100,88,52,64]
    console.log(arr.join(','))
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - 1 - i; j++){
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = temp
            }
        }
    }
    console.log(arr.join(','))
}
// bubble()

// 选择排序
function selectSort() {
    var arr = [0,5,33,4,66,88,2,5,11,21,35,10,100,88,52,64]
    console.log(arr.join(','))
    var minIndex, temp
    for(var i=0; i < arr.length - 1; i++){
        minIndex = i
        for(j = i; j < arr.length -1; j++){
            if(arr[j] < arr[minIndex]){
                minIndex = j
            }
        }
        temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
    }
    console.log(arr.join(','))
}
selectSort()