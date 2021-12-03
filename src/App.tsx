import './App.css';
import Salesorders from './Json/salesorders.json';

let pivotDataa = Salesorders;
let pivotDatab = Salesorders;
let pivotDatac = Salesorders;

function App() {

  /**************  SALEORDERS JSON   ***************/
  /*** SALESORDERS JSON DATA SORTING ***/

pivotDataa.sort((a, b) => {
if (a.state < b.state) {
return -1;
}
if (a.state > b.state) {
return 1;
}
return 0;
})


pivotDatab.sort((a, b) => {
if (a.subCategory < b.subCategory) {
return -1;
}
if (a.subCategory > b.subCategory) {
return 1;
}
return 0;
})


pivotDatac.sort((a, b) => {
if (a.category < b.category) {
return -1;
}
if (a.category > b.category) {
return 1;
}
return 0;
})


let categorycheck:string='';
let subcategorycheck:string='';
let statecheck:string='';
let categorycounter:number=0;
let subcategorycounter:number=0;
let statecounter:number=0;
let statearrayhead:any[] = [];
let statearray:any[] = [];
let categoryarrayhead:any[] = [];
let categoryarray:any[] = [];
let subcategoryarrayhead:any[] = [];
let subcategoryarray:any[] = [];
let blankhtmldatab = <></>
/**************  STATES SECTION   ***************/
/*** FILTER AND SORT STATES INRO ARRAY ***/
let saleslisthead =  pivotDataa.map((data)=>{
if(statearrayhead.includes((data.state).toString())===true){
statecounter++;
}else{
statearray.push(data.state);
statecounter=0;
}
//add duplicate states  to the array
statearrayhead.push(data.state);
if(pivotDataa.length===statearrayhead.length){
statearrayhead=[];
}
statecheck=data.state;
return (
<>
{statecounter===0 ?<div className="divTableHead">{data.state}</div>:''}
</>
)
});

//sorting of states array
statearray.sort();
saleslisthead =  statearray.map((data)=>{
return (
<>
<div className="divTableHead">{data}</div>
</>
)
})


/**************  CATEGORY SECTION   ***************/
/*** FILTER AND SORT CATEGORIES INTO ARRAY ***/
pivotDataa.map((data)=>{
if(categoryarrayhead.includes((data.category).toString())===true){
statecounter++;
}else{
categoryarray.push(data.category);
statecounter=0;
}
//add duplicate states to the array
categoryarrayhead.push(data.category);
if(pivotDataa.length===categoryarrayhead.length){
categoryarrayhead=[];
}
statecheck=data.category;
return (
<>
{statecounter===0 ?<div className="divTableCell">{data.category}</div>:''}
</>
)
});
categoryarray.sort();
categoryarray.map((data)=>{
return (
<>
<div className="divTableRow"><div className="divTableCell">{data}</div></div>
</>
)
})


/**************  SUBCATEGORY SECTION   ***************/
/*** FILTER AND SORT SUBCATEGORIES INRO ARRAY ***/
pivotDataa.map((data)=>{
if(subcategoryarrayhead.includes((data.subCategory).toString())===true){
statecounter++;
}else{
subcategoryarray.push(data.subCategory);
statecounter=0;
//add duplicate categories  to the array
subcategoryarrayhead.push(data.subCategory);
if(pivotDataa.length===subcategoryarrayhead.length){
subcategoryarrayhead=[];
}
statecheck=data.subCategory;
return (
<>
{statecounter===0 ?<div className="divTableCell">{data.subCategory}</div>:''}
</>
)
}
return(<></>);
});

//sorting of subcategory array
subcategoryarray.sort();
subcategoryarray.map((data)=>{
return (
<>
<div className="divTableRow"><div className="divTableCell">{data}</div></div>
</>
)
})


/**************  MERGE METRICS SECTION   ***************/
/*** FILTER AND COMBINE JSON DATA WITH CALCULATION FROM TOTALS ***/
let state:string="";
let jsoncombined:any[]=[{}];
let totalarraycombined:any[]=[];
/*** LOOP THE SORTED SUBCATEGORIES ***/
subcategoryarray.map((dataa)=>{
/*** GET THE SUBCATEGORY DATA FROM JSON ***/
var subcategorydatab = pivotDatac.filter(datab => { return datab.subCategory===dataa });
statearray.map((datac)=>{
state=datac;
/***  FILTER SUBCATEGORY WITH STATES ***/
var subcategorydatac = subcategorydatab.filter(datad => { return datad.state===datac });
/***  REDUCER FUNCTION TO SUM THE STATE TOTALS ***/
var total = subcategorydatac.reduce((prev:number, current)=> {
return (Math.round(prev) + Math.round(current.sales));
}, 0);
totalarraycombined.push(total);
/*** CREATE JSON OBJECT FOR THE FRONT END DATA ***/
jsoncombined = [{}].concat(jsoncombined, [{category:subcategorydatab[0].category, subCategory:dataa, state:state, sales:total}]);
return null;
})
return null;
})


let perstatetotalhtmldata=<></>
let blankhtmldata=<></>
let bcount:number=0;
let jsoncombinedcounter:number=0;
statearray.map((i)=>{
var jsoncombinedstatecategorygettotal = jsoncombined.filter(datae => { return datae.state===(i) });
jsoncombinedcounter++;
var total = jsoncombinedstatecategorygettotal.reduce((prev, current)=> {
return (Math.round(prev) + Math.round(current.sales));
}, 0);
perstatetotalhtmldata=<>{perstatetotalhtmldata}<div className="divTableCell">{total}</div></>
if(bcount===0){
blankhtmldata=<>{blankhtmldata}<div className="divTableCell">STATES</div></>
}
else{
blankhtmldata=<>{blankhtmldata}<div className="divTableCell"></div></>
}
blankhtmldatab=blankhtmldata;
bcount++;
return(
{perstatetotalhtmldata}
)
})


/**************  GET  METRICS SECTION   ***************/
/*** MERGE DATA FROM FILTERED JSON AND GET TOTALS ***/

/* GET CATEGORIES AND PUSH THEM TO ARRAY */
let categorycheckfinallist:string='';
let subcategorycheckfinallist:string='';
let categorycounterfinallist:number=0;
let subcategorycounterfinallist:number=0;
let statecounterbfinallist:number=0;
let subcategorycountefinallist:number=0;
let categoryfinallistarray:any = []
pivotDatac.map((pivotDatab)=>{
if(categorycheckfinallist===pivotDatab.category){
categorycounterfinallist++;
}else{
categorycounterfinallist=0;
}
if(subcategorycheckfinallist===pivotDatab.subCategory){
subcategorycounterfinallist++;
return (
<></>
)
}else{
statecounterbfinallist=0;
subcategorycountefinallist=0;
}
categorycheckfinallist=pivotDatab.category;
subcategorycheckfinallist=pivotDatab.subCategory;
categoryfinallistarray.push(pivotDatab.category);
return categoryfinallistarray;
});

// CALCULATE TOTAL PER STATE AND CATEGORY AND RETURN THE ROWS
categorycheck='';
let mycounter:number=0;
let mycountera:number=0;
let statecounterb:number=0;
let saleslist =  pivotDatac.map((pivotDatab)=>{
if(categorycheck===pivotDatab.category){
categorycounter++;
}else{
categorycounter=0;
}

let categorysalestotalhtmldata=<></>
if(subcategorycheck===pivotDatab.subCategory){
subcategorycounter++;
return (
<></>
)
}else{
statecounterb=0;
subcategorycounter=0;
}

statecounter++;
// UI FOR THE CATEGORY TOTALS
categorycheck=pivotDatab.category;
subcategorycheck=pivotDatab.subCategory;

/*** LOOP THROUGH TOTALS PER STATE AND ADD THEM TO TABLE IN THE FRONTEND ***/
var statesalestotalhtmldata = <></>
statearray.map((i)=>{
var jsoncombinedstatesubcategorygettotal = jsoncombined.filter(datae => { return datae.state===i && datae.subCategory===subcategorycheck});
statesalestotalhtmldata=<>{statesalestotalhtmldata}<div className="divTableCell">{jsoncombinedstatesubcategorygettotal[0].sales}</div></>
return(
{statesalestotalhtmldata}
)
})

/*** LOOP THROUGH TOTALS PER CATEGORY AND ADD THEM TO TABLE IN THE FRONTEND ***/
statearray.map((i)=>{
var jsoncombinedstatecategorygettotal = jsoncombined.filter(datae => { return datae.state===i && datae.category===categorycheck});
var total = jsoncombinedstatecategorygettotal.reduce((prev, current)=> {
return Math.round(prev) + Math.round(current.sales);
}, 0);
categorysalestotalhtmldata=<>{categorysalestotalhtmldata}<div className="divTableCell">{total}</div></>
return(
{categorysalestotalhtmldata}
)
})

//Counter to get the row positions of the subcategories in a category
if(categorycounter!==0){
}else{
mycountera=0; //count categories
}
mycountera++;
mycounter=0;
for(let i:number=0; i<categoryfinallistarray.length; i++){
if(categoryfinallistarray[i]===categorycheck){
mycounter++;
}
}


return (
<>
{/* State Totals*/}
<div className="divTableRow">
{categorycounter===0 ?<div className="divTableCell">{pivotDatab.category}</div>:<div className="divTableCell"></div>}
{subcategorycounter===0 ?<div className="divTableCell">{pivotDatab.subCategory}</div>:<div className="divTableCell"></div>}
<>{statesalestotalhtmldata}</>
</div>
{/* Category Totals*/}
<div className="divTableRowTotals">
{mycountera===mycounter ?<div className="divTableCell"></div>:<></>}
{mycountera===mycounter ?<div className="divTableCell">{categorycheck} Total</div>:<></>}
{mycountera===mycounter ?<>{categorysalestotalhtmldata}</>:<></>}
</div>
</>
)
});


/**************  USER INTERFACE SECTION(DIMENSIONS SECTION)    ***************/
/*** DISPLAY TABLE DATA ***/
return (
<div>
<div className="divTable">
<div className="divTableHeading">
<div className="divTableHead">PRODUCTS</div>
<div className="divTableHead"></div>
{blankhtmldatab}
</div>
<div className="divTableHeading">
<div className="divTableRow">
<div className="divTableHead">Category</div>
<div className="divTableHead">subCategory</div>
{saleslisthead}
</div>
</div>
<div className="divTableBody">
{saleslist}
</div>
{/*<div className="divTableRowTotals">{categorycheck} Total<div className="divTableCell"></div>{categorysalestotalhtmldatab}
</div>*/}
<div className="divTableHeading">
<div className="divTableCell"></div><div className="divTableCell">Total</div>{perstatetotalhtmldata}
</div>
</div>
</div>
);
}

export default App;
