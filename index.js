
"use strict";

const alphabets = require('./utils/alphabets');
const getNamePoints = (text) => {
    

        return new Promise((resolve,reject)=> {

            if(text.length>6)  {
                reject("The Length of the text is more than 6, Please enter 6 or less words.");
                console.error("The Length of the text is more than 6, Please enter 6 or less words.");
                
                // return callback("The Length of the text is more than 6, Please enter 6 or less words.");
            }
            else {
                const chars = text.split('');
                const alphabetsArray = Object.entries(alphabets);
                const getCharIndex = (char) => {
                    let index = null;
                    // runs a loop on every character 
                    alphabetsArray.forEach(function (item, arrayIndex) {
                        // if current character i.e item[0] matches entered char 
                        if(item[0] === char)
                            index = arrayIndex;
                    });
                    return index;
                }
                
                const widthOf = (arr) => {
                    let maxWidth=0;
                    for (let index = 0; index < arr.length; index++) {
                        const element = arr[index];
                        (element.x > maxWidth) ? (maxWidth = element.x) : null;
                    }
                    // as array starts from zero so maxwidth will be 1 larger
                    return maxWidth + 1;
                }

                const indexOfChars = chars.map(el => getCharIndex(el)); 
                
                const graphCharsArr = indexOfChars.map(charAscii => {
                    alphabetsArray[charAscii].push(widthOf(alphabetsArray[charAscii][1]))
                    return (alphabetsArray[charAscii]);
                });

                
            // add width to every character seperately
                const addWidthToChar = () => {
                    let prevWidth = 1;
                    const addWidthToCurrentChar = (arr,width) => {        
                        let newArray = [];
                        for (let index = 0; index < arr.length; index++) {
                            const element = arr[index];
                            const tempObj = {
                                x: element.x + width,
                                y: element.y
                            }
                            newArray.push(tempObj);
                        }
                        return newArray;
                    }
                    const updatedArr = graphCharsArr.map((element,index) => {
                        if(index === 0) {
                            const tempArr = addWidthToCurrentChar(element[1],prevWidth);
                            prevWidth += element[2]+1;
                            return tempArr;
                        }
                        else {
                            const tempArr = addWidthToCurrentChar(element[1],prevWidth);
                            prevWidth += element[2]+1;
                            return tempArr;
                        }
                    })
                    return updatedArr;
                }

                let nameArray = [];
                const unorganisedArray = addWidthToChar();

                    unorganisedArray.forEach(latestcharArray=>{
                        latestcharArray.forEach(dimensions => {
                            nameArray.push(dimensions);
                        })
                    })

                    resolve(nameArray);
                    return nameArray;

            };

        });


// return nameArray;
}

module.exports = getNamePoints;
