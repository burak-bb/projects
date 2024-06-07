const express = require('express');
const app = express()

app.use(express.json());

function calcMean(nums) {
    let sum = 0

    for(let num of nums) {
        sum += num
    }
    return sum / nums.length;
}

function calcMedian(nums) {
    nums.sort((a, b) => a - b); 
    const half = Math.floor(nums.length / 2); 

    if (nums.length % 2 === 0) {
        return (nums[half - 1] + nums[half]) / 2;
    } else {
        return nums[half];
    }
}

const calcMode = (nums) => {
    let frequency = {};
    let maxFreq = 0;
    let modes = [];
  
    for (let num of nums) {
      frequency[num] = (frequency[num] || 0) + 1;
      if (frequency[num] > maxFreq) {
        maxFreq = frequency[num];
      }
    }
  
    for (let num in frequency) {
      if (frequency[num] === maxFreq) {
        modes.push(Number(num));
      }
    }
  
    return modes;
  };


app.get('/mean', (req, res) => {
    let nums = req.query.nums;
    let arr = nums.split(',').map(Number)
    mean = calcMeanean(arr)
    const jsonData = {
        operation: "mean",
        value: mean
    }
    res.json(jsonData)
})

app.get('/median', (req, res) => {
    let nums = req.query.nums;
    let arr = nums.split(',').map(Number)
    median = calcMedian(arr)
    const jsonData = {
        operation: "median",
        value: median
    }
    res.json(jsonData)
})

app.get('/mode', (req, res) => {
    let nums = req.query.nums;
    let arr = nums.split(',').map(Number)
    mode = calcMode(arr)
    const jsonData = {
        operation: "Mode",
        value: mode
    }
    res.json(jsonData)
})

app.get('/all', (req, res) => {
    let nums = req.query.nums;
    let arr = nums.split(',').map(Number)
    mean = calcMean(arr)
    median = calcMedian(arr)
    mode = calcMode(arr)
    const jsonData = {
        operation: "All",
        Mean: mean,
        median: median,
        mode: mode
    }
    res.json(jsonData)
})



app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });