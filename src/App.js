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


let categorycheck='';
let subcategorycheck='';
let statecheck='';
let categorycounter=0;
let subcategorycounter=0;
let statecounter=0;
let statecountera='';
let statecounterb=0;
let statesalessum=0;
let subcategorysalessum=0;
let statearrayhead = new Array();
let statearray = new Array();
let categoryarrayhead = new Array();
let categoryarray = new Array();
let subcategoryarrayhead = new Array();
let subcategoryarray = new Array();
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


/**************  SCATEGORY SECTION   ***************/
/*** FILTER AND SORT CATEGORIES INTO ARRAY ***/
let categorylisthead =  pivotDataa.map((data)=>{
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
categorylisthead =  categoryarray.map((data)=>{
  return (
  <>
  <div className="divTableRow"><div className="divTableCell">{data}</div></div>
  </>
  )
})


/**************  SUBCATEGORY SECTION   ***************/
/*** FILTER AND SORT SUBCATEGORIES INRO ARRAY ***/
let subcategorylisthead =  pivotDataa.map((data)=>{
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
});

//sorting of subcategory array
subcategoryarray.sort();
subcategorylisthead =  subcategoryarray.map((data)=>{
  return (
  <>
  <div className="divTableRow"><div className="divTableCell">{data}</div></div>
  </>
  )
})


/**************  MERGE METRICS SECTION   ***************/
/*** FILTER AND COMBINE JSON DATA WITH CALCULATION FROM TOTALS ***/
let state="";
let jsoncombined=[{}];
let subcategory="";
let total=0;
let totalarraycombined=new Array();
/*** LOOP THE SORTED SUBCATEGORIES ***/
let subCategorytotal  =  subcategoryarray.map((dataa)=>{
/*** GET THE SUBCATEGORY DATA FROM JSON ***/
var subcategorydatab = pivotDatac.filter(datab => { return datab.subCategory===dataa });
statearray.map((datac)=>{
    total=0;
    state=datac;
/***  FILTER SUBCATEGORY WITH STATES ***/
var subcategorydatac = subcategorydatab.filter(datad => { return datad.state===datac });
/***  REDUCER FUNCTION TO SUM THE STATE TOTALS ***/
    total = subcategorydatac.reduce((prev, current)=> {
return parseInt(Math.round(prev)) + +parseInt(Math.round(current.sales));
  }, 0);
    totalarraycombined.push(total);
/*** CREATE JSON OBJECT FOR THE FRONT END DATA ***/
jsoncombined = [].concat(jsoncombined, [{category:subcategorydatab[0].category, subCategory:dataa, state:state, sales:total}]);
return null;
})
return null;
})


let perstatetotalhtmldata=<></>
let blankhtmldata=<></>
let bcount=0;
statearray.map((i)=>{
var jsoncombinedstatecategorygettotal = jsoncombined.filter(datae => {return datae.state===i});
var total = jsoncombinedstatecategorygettotal.reduce((prev, current)=> {
  return parseInt(Math.round(prev)) + +parseInt(Math.round(current.sales));
  }, 0);
perstatetotalhtmldata=<>{perstatetotalhtmldata}<div className="divTableCell">{total}</div></>
if(bcount===23){
blankhtmldata=<>{blankhtmldata}<div className="divTableCell">STATE</div></>
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

let counttotal=0;
let categorysalestotalhtmldatab=<></>;
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

statearray.map((i)=>{
var jsoncombinedstatecategorygettotal = jsoncombined.filter(datae => { return datae.state===i && datae.category===categorycheck});
var total = jsoncombinedstatecategorygettotal.reduce((prev, current)=> {
  return parseInt(Math.round(prev)) + +parseInt(Math.round(current.sales));
  }, 0);
categorysalestotalhtmldata=<>{categorysalestotalhtmldata}<div className="divTableCell">{total}</div></>
categorysalestotalhtmldatab=categorysalestotalhtmldata;
  return(
{categorysalestotalhtmldata}
  )
})

  if(statecheck===pivotDatab.state){
  statecounter++;
  statecountera=pivotDatab.state;
  statecounterb=0;
  if((statecounter===0)&&(subcategorycounter===0)&&(categorycounter===0)){
  return (
    <div className="divTableRow"><div className="divTableCell">mm</div></div>
  )
  }else{
  if(categorycheck!==pivotDatab.category){
        counttotal++;
    if(counttotal===1){
    return (
    <div className="divTableRowTotals"><div className="divTableCell">{categorycheck} Total</div><div className="divTableCell"></div>{categorysalestotalhtmldata}</div>
    )
  }
  }
  }

  }else{
    counttotal=0;
    statecounterb=0;
    statecounterb=statecounter;
    statecounter=0;
    statecountera=pivotDatab.state;
  }

  if(statecounter===0){
    statesalessum=0;
    statesalessum+=parseInt(Math.round(pivotDatab.sales));
  }else{
    statesalessum+=parseInt(Math.round(pivotDatab.sales));
  }
  if(subcategorycounter===0){
    subcategorysalessum+=statesalessum;
  }else{
    subcategorysalessum+=statesalessum;
  }

    categorycheck=pivotDatab.category;
    subcategorycheck=pivotDatab.subCategory;
    statecheck=pivotDatab.state;


/*** LOOP THROUGH TOTALS PER STATE AND ADD THEM TO TABLE IN THE FRONTEND ***/
var statesalestotalhtmldata = <></>
statearray.map((i)=>{
var jsoncombinedstatesubcategorygettotal = jsoncombined.filter(datae => { return datae.state===i && datae.subCategory===subcategorycheck});
statesalestotalhtmldata=<>{statesalestotalhtmldata}<div className="divTableCell">{jsoncombinedstatesubcategorygettotal[0].sales}</div></>
  return(
  {statesalestotalhtmldata}
  )
})


var categoryhtmldata = <></>
categoryarray.map((i)=>{
categoryhtmldata=<>{categoryhtmldata}<div className="divTableCell">{i}</div></>
  return(
  {categoryhtmldata}
  )
})


var subcategoryhtmldata = <></>
subcategoryarray.map((i)=>{
subcategoryhtmldata=<>{subcategoryhtmldata}<div className="divTableCell">{i}</div></>
  return(
  {subcategoryhtmldata}
  )
})


return (
<div className="divTableRow">
{categorycounter===0 ?<div className="divTableCell">{pivotDatab.category}</div>:<div className="divTableCell"></div>}
{subcategorycounter===0 ?<div className="divTableCell">{pivotDatab.subCategory}</div>:<div className="divTableCell"></div>}
{/* {<td>{Math.round(pivotDatab.sales)}</td>:<td></td>} */}
<>{statesalestotalhtmldata}</>
<div>
</div>
</div>
)
});


/**************  USER INTERFACE SECTION(DIMENSIONS SECTION)    ***************/
/*** DISPLAY TABLE DATA ***/
  return (
  <div>
  <div className="divTable" border="1">
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
  <div className="divTableRowTotals">
  <div className="divTableCell">{categorycheck} Total</div><div className="divTableCell"></div>{categorysalestotalhtmldatab}
  </div>
  <div className="divTableHeading">
  <div className="divTableCell">Total</div><div className="divTableCell"></div>{perstatetotalhtmldata}
  </div>
  </div>
  </div>
  );
}

export default App;
