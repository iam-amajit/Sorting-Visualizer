const arrayContainer = document.getElementById("array-container");

const generateArray = () => {
    arrayContainer.innerHTML = "";
    for (let i = 0; i < 30; i++) {
        const barHeight = ~~(Math.random() * 80) + 20;
        const arrayBar = document.createElement("div");
        arrayBar.classList.add("array-bar");
        arrayBar.style.height = `${barHeight}%`;
        arrayContainer.appendChild(arrayBar);
    }
};

const swap = (bar1, bar2) => {
    return new Promise((resolve) => {
        const tempHeight = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = tempHeight;
        setTimeout(() => {
            resolve();
        }, 50);
    });
};

const BubbleSort = async () => {
    const bars = document.querySelectorAll(".array-bar");
    for (let i = 0; i < bars.length - 1; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            bars[j].style.backgroundColor = "#ff6f61";
            bars[j + 1].style.backgroundColor = "#ff6f61";
            if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                await swap(bars[j], bars[j + 1]);
            }
            bars[j].style.backgroundColor = "white";
            bars[j + 1].style.backgroundColor = "white";
        }
        bars[bars.length - 1 - i].style.backgroundColor = "#6b6b6b";
    }
};

const InsertionSort = async () => {
    const bars = document.querySelectorAll(".array-bar");
    for (let i = 1; i < bars.length; i++) {
        let j = i;
        while (j > 0 && parseInt(bars[j].style.height) < parseInt(bars[j - 1].style.height)) {
            bars[j].style.backgroundColor = "#ff6f61";
            bars[j - 1].style.backgroundColor = "#ff6f61";
            await swap(bars[j], bars[j - 1]);
            bars[j].style.backgroundColor = "white";
            bars[j - 1].style.backgroundColor = "white";
            j--;
        }
    }
};

const SelectionSort = async () => {
    const bars = document.querySelectorAll(".array-bar");
    for (let i = 0; i < bars.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < bars.length; j++) {
            if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            bars[i].style.backgroundColor = "#ff6f61";
            bars[minIndex].style.backgroundColor = "#ff6f61";
            await swap(bars[i], bars[minIndex]);
            bars[i].style.backgroundColor = "white";
            bars[minIndex].style.backgroundColor = "white";
        }
    }
};

const QuickSort = async (low = 0, high = 29) => {
    const bars = document.querySelectorAll(".array-bar");
    if (low < high) {
        let pivotIndex = await partition(bars, low, high);
        await QuickSort(low, pivotIndex - 1);
        await QuickSort(pivotIndex + 1, high);
    }
};

const partition = async (bars, low, high) => {
    let pivot = parseInt(bars[high].style.height);
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (parseInt(bars[j].style.height) < pivot) {
            i++;
            bars[i].style.backgroundColor = "#ff6f61";
            bars[j].style.backgroundColor = "#ff6f61";
            await swap(bars[i], bars[j]);
            bars[i].style.backgroundColor = "white";
            bars[j].style.backgroundColor = "white";
        }
    }
    await swap(bars[i + 1], bars[high]);
    return i + 1;
};

generateArray();