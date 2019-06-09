/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


//two global variables, li contains all the li elements, where the students are defined
//We want 10 items per page, so have the variable pageItems initialized to 10, 
//if want to change it, we can easily do it by changing this value
//CORRECTION, I had to change the way I get the li because if I do it by getElementsByTagName, the rest of the li (page numbers)
// were hided too.
const li = document.getElementsByClassName('student-item');
const pageItems = 10;

 //building the page links at the end of the div with the class 'page'
   //A div, and an ul inside of the div
   //Needs to be global beacuse if I try to call appendPageLinks from the showSearch the pagination links duplicate.
   const divPage = document.querySelector('.page')
   const div = document.createElement('div');
   div.className = 'pagination';
   divPage.appendChild(div);
   let ul = document.createElement('ul');
   div.appendChild(ul);
   
   

//adding the search component
const divHeader = document.querySelector('.page-header');
const divSearch = document.createElement('div');
divSearch.className = 'student-search';
divHeader.appendChild(divSearch);
const inputSearch = document.createElement('input');
inputSearch.placeholder = 'Search for students...';
const buttonSearch = document.createElement('button');
buttonSearch.textContent = 'Search'
divSearch.appendChild(inputSearch);
divSearch.appendChild(buttonSearch);


/*** 
   showPage function displays a group of students and hides the rest of them
   first parameter is the list of students, and the page number, this value will define which students we want to show
   and which one we want to hide.
   We loop all the list and if they are inside the range we want to display, we'll change 'display' property to
   an empty string, if they are out of the range we'll change that property to 'none'. 
   Then, we invoke the function so the first page (first ten students) will be displayed
***/

function showPage (li,pageNumber){

   const startIndex = (pageNumber * pageItems) - pageItems;
   const endIndex = pageNumber * pageItems;
   
   for (let i=0; i< li.length ; i+=1){
      if (i>= startIndex && i<endIndex){
         li[i].style.display = '';
      }else{
         li[i].style.display = 'none';
      }
      //console.log(li[i]);
   }
}
showPage(li,1);



/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function appendPageLinks (li){
   div.removeChild(ul);
   ul = document.createElement('ul');
   div.appendChild(ul);
   
   //we want to add a list item inside the ul so wwe have to know how many of the we need.
   linksNumber = (li.length/pageItems);
   //console.log (linksNumber);
   for (let i=0; i<ul.length;i+=1){
      ul.removeChild;
   }
   //we do a loop to build the exact number of li we need

   for (let i=0; i<linksNumber; i++){
      const l = document.createElement('li');
      //inside of each li we create an a element with a href attribute and its page number as text.
      const a = document.createElement('a');
      //const href = document.createAttribute('href');
      a.textContent = i+1;
      ul.appendChild(l);
      l.appendChild(a);
      a.setAttribute('href','#');
   }
   ul.firstChild.firstChild.className='active';
   
   //we created an a list so we can add an eventListener to each a element.
   const aList = document.getElementsByTagName('a');
   //console.log(aList.length);

   for (let i=0; i<aList.length; i++){
      aList[i].addEventListener('click',(e) => {
         const aSelected = e.target;
         //a loop to remove the active link 
         for (let j=0; j<aList.length; j++){
            aList[j].className = '';
         }
         //it works like that, but I'm going to use event.target
         //aList[i].className = 'active';
         //showPage(li,aList[i].textContent);

         aSelected.className = 'active';
         //call the function showPage passing the global listItem and the page number
         showPage(li,aSelected.textContent);
      });
   } 

}

appendPageLinks(li);

function showSearch(searchValue,li){
    
   //if nothing is written in the search input, the web will show its initial state
   if (searchValue.length === 0){
      showPage (li,1);
      appendPageLinks(li);
   } else {
      //create an alternative list, only the matches will be joined
      let al = [];
      //looping the whole list looking for matches from our search
      for (let i=0; i< li.length ; i+=1){
         
         //get the name of the student, maybe there's an easier way...
         const divDetail = li[i].querySelector('.student-details');
         const name = divDetail.querySelector('h3');
         //console.log(name.textContent+' '+searchValue);
         if (name.textContent.toLowerCase().includes(searchValue.toLowerCase()) ){
            //add the student to the alternative list
            //console.log(li[i]);
            al.push(li[i]);
            
         }
         //hide all the original list
         li[i].style.display =  'none';
      }
      showPage(al,1);
      appendPageLinks(al);
   }

}

buttonSearch.addEventListener('click',(e)=>{
   e.preventDefault();
   showSearch(inputSearch.value,li);
});

inputSearch.addEventListener('keyup',()=>{
   showSearch(inputSearch.value,li);
});
// Remember to delete the comments that came with this file, and replace them with your own code comments.