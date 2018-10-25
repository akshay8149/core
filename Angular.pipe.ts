import { Pipe,PipeTransform } from '@angular/core';


@Pipe({
  name:"pipe",
})

export class pipepage implements PipeTransform
{



transform(value:any)
{

  if(value)
  {
    let a;
     a = value.replace(/0/g,'null')
    a = a.replace(/1/g,'one')
    a = a.replace(/2/g,'two')
    a = a.replace(/3/g,'three')
    a = a.replace(/4/g,'four')
    a = a.replace(/5/g,'five')
   a = a.replace(/6/g,'six')
   a = a.replace(/7/g,'seven')
    a = a.replace(/8/g,'eight')
  a = a.replace(/9/g,'nine')
   
return a;

  }



}


}
