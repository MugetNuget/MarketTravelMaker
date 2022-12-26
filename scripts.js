const puppeteer =  require('puppeteer');

function enlaces(material,Listas){
    direc ="https://www.albiononline2d.com/en/item/id/T";
    for(i=3;i<9;i++){
        Listas[material].push(direc+i+"_"+material);
    }
    return Listas;
}

async function Get_Data(url,page){
    await page.goto(url);
    await page.waitForSelector('tbody#market-table-body');
    await page.waitForTimeout(100);
    const tabla = await page.evaluate(() => {
        const elements = document.querySelector('#market-table-body')
        return elements.innerText;
    });
    return tabla;

}

Listas={ CLOTH:[],FIBER:[],HIDE:[],LEATHER:[],METALBAR:[],ORE:[],PLANKS:[],STONEBLOCK:[],WOOD:[] }
materiales=Object.keys(Listas);

for(let material of materiales){
    direcciones=enlaces(material,Listas);
}
ListaDirecciones=Object.keys(direcciones);



(async ()=>{
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: {
            width: 1200,
            height: 600
        },
        args: ['window-size=1200, 1080']
    });

   
    const page = await browser.newPage();
    var datos=[];
    var cont=3;
    var cont1=1;
    var cont2=0;
    for(let direccion of ListaDirecciones){
        cont2=cont2+direcciones[direccion].length;
    }

    for(let direccion of ListaDirecciones){
        
        for(i=0; i<direcciones[direccion].length;i++){
        datos.push("T"+cont+"_"+direccion+"\n"+(await Get_Data(direcciones[direccion][i],page)));
        console.clear();
        console.log("Progreso: "+(cont1*100/(cont2)).toFixed(2)+"%"+"  "+cont1+"/"+cont2);
   
        cont++;cont1++;
        if (cont==9){
            cont=3;
        }
    }
    }
    await console.clear();
    await page.waitForTimeout(1000);
    console.log(datos);
    
    

})();


