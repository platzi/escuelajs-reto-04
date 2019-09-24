import FonditaLoop from './plugins/FonditaLoop';
const htmlTable:HTMLDivElement = document.querySelector('#wiz_table');

class index {

    fonditaLoop:any;
	htmlTable:HTMLDivElement;
	aAllPedido:any[] = [];
	private nTagConsole:number=0;
	
	/**
	 *Creates an instance of index.
	 * @memberof index
	 */
	constructor(){

        this.fonditaLoop = new FonditaLoop();
        this.htmlTable = htmlTable;

		this.createTable();
		
		this.RestaurantOpen();


			setTimeout( ()=>{
				
				this.waiter2();

				this.waiter3();

			},6000);


	}

	/**
	 * method to order of the table one and three
	 *
	 * @memberof index
	 */
	waiter2(){

		/** I show all my waiter in screen */
		this.showAllWater();

		/**
		 * In process Table 1
		 */
		let vTableNum:number = 0;
		this.processOrder( this.aAllPedido[vTableNum] , vTableNum );

		/**
		 * IN process Table 2
		 */
		let vTableNum3:number = 2;
		this.processOrder( this.aAllPedido[vTableNum3] , vTableNum3 );

    };
	
	/**
	 *method to process the table 2
	 *
	 * @memberof index
	 */
	waiter3(){

		let vTableNum1:number = 1;
		this.processOrderAsync( this.aAllPedido[ vTableNum1 ] , vTableNum1 );
	};

	/**
	 *this method is for create the people in each table 
	 *
	 * @memberof index
	 */
	async RestaurantOpen(){

		let myMenuIs    		= await this.fonditaLoop.getOnlyMenu();
		let vTimeBussy:number 	= 1000;

		this.fonditaLoop.getTable().forEach(( list, id:number) => {

			let ttalPerson:number = this.fonditaLoop.getPeopleReserved();

				this.consoleLog(`=======`,``);
				this.consoleLog('Ocupando la mesa:' , ( id + 1 ) );

				for (let index = 0; index < ttalPerson; index++) {

					setTimeout( () =>{

						this.pushIconTable({ id , index });

						setTimeout( ()=>{

							this.pushIconTablePedido({ id , index });
						},200);

					}, (vTimeBussy));
					
					vTimeBussy +=500;
				}
		});
			
			

	};

	/**
	 * This method is for create the tables
	 *
	 * @memberof index
	 */
	createTable(){

        let vHTML:string		=``;
        let vElement			= document.createElement("div");
        let ordenTable:number	= 0;
        let spaceFonda:number	= 2;
		let ordentbg:number		= 0;
		
            this.fonditaLoop.getTable().forEach(( list, id:number) => {
			
                if(spaceFonda === 2 && ordenTable === 0 ){

                	vHTML += '<div class="row">';
					vHTML += (spaceFonda== 2)&&`<div class="col-2 wiz_table__spacetable wiz_table__spacetable-drone">
													<img id="wiz-jx-waiter-2" class="wiz_table__spacetable__imgdrone"  src="https://web.artcompanysystem.com/public/platzi/robot1.png" >
												</div>`;
				}else if(ordenTable === 0){

					vHTML += '<div class="row">';
				}
                ordenTable++;
             

				vHTML += `<div class="col-4 wiz_table__spacetable wiz_table__spacetable-table">
							<div class="wiz_table__spacetable__footertable" >${ list.nameshort }</div>
							<div id="jx-per-${id}" class="row wiz_table__spacetable__person"></div>
							<div id="jx-per-or-${id}" class="row wiz_table__spacetable__person"></div>
							<div id="jx-per-wa-${id}" class="row wiz_table__spacetable__person"></div>
							<!--<img class="wiz_table__spacetable__imgtable animated bounceIn" src="30235.jpg" >	-->	
							
						</div>`;

                if(spaceFonda === 2 && ordenTable === 2 ){

					vHTML 		+= `<div class="col-2 wiz_table__spacetable wiz_table__spacetable-drone">
										<img id="wiz-jx-waiter-3" class="wiz_table__spacetable__imgdrone" src="https://web.artcompanysystem.com/public/platzi/robot2.png" >
									</div></div>`;
				 	ordenTable	= 0;
				 	spaceFonda 	= 3;
                }
                    
            });

            vElement.innerHTML = `${vHTML}</div>`;

            this.htmlTable.appendChild(vElement);
	};
	
	/**
	 *This method is for create the icon people
	 *
	 * @param {*} aInfo
	 * @memberof index
	 */
	pushIconTable( aInfo:any ){
		//let list 	= aInfo.list;
		let id		= aInfo.id;
		let index	= aInfo.index;
		let IcoRand = this.fonditaLoop.getOneNumberRamdon(1,70);
		let vTable:number = ( id + 1 );
		let vDiner:number = ( index + 1 );

		let personIco:HTMLDivElement = document.querySelector(`#jx-per-${id}`);

		let vElement = document.createElement("div");
		let UriAvatarRan:string = `https://i.pravatar.cc/150?img=${IcoRand}`;

		this.consoleLog(`At table ${vTable}, entering diner ${vDiner}: <img style="height:12px" src="${UriAvatarRan}" />` , `` );

			vElement.className = 'col-3';
			vElement.innerHTML = `<div id="wiz-jx-per-one-${id}-${index}" class="wiz_table__spacetable__person-icon backg-blue animated zoomIn" >
										<img  class="wiz_table__spacetable__person-icon_img" src="${UriAvatarRan}" />
									</div>`;

			personIco.appendChild(vElement);

	};

	pushIconTablePedido( aInfo:any ){

		let id				= aInfo.id;
		let index			= aInfo.index;
		let vDiner:number 	= ( index + 1 );
		let vTable:number 	= ( id + 1 );
		let vMenu 			= this.fonditaLoop.getOnlyMenu();
		let vMenuName:string= vMenu.name;
		let vMenuImag:string= vMenu.pict;
		let vPedido 		= { 
							id 	: index , 
							menu: vMenuName
						};	
			if( this.aAllPedido[ id ] ){

				this.aAllPedido[ id ].push( vPedido );
			}else{

				this.aAllPedido.push([ vPedido ]);
			}

		//let vTtallPedido:number = this.aAllPedido[ id ].length;
			
		//console.log(`vTtallPedido== ${vTtallPedido}`);
		//	this.aAllPedido[ id ][vTtallPedido] = vPedido;  //= vPedido;

			
		this.consoleLog(`diner ${vDiner}, Table ${vTable}: ` , '' );
		this.consoleLog(`-->Orders ` , ( vMenuName ) );

		let personIcoPedido:HTMLDivElement 	= document.querySelector(`#jx-per-or-${id}`);
		let vElement 						= document.createElement("div");
		vElement.className 					= 'col-3';

		vElement.innerHTML = `<div id="wiz-jx-per-or-one-${id}-${index}" title="el comensal ${(index+1)} pide:${vMenuName}" class="wiz_table__spacetable__person-icon backg-yellow animated flash infinite" >
									<img  class="wiz_table__spacetable__person-icon_img" src="${vMenuImag}" />
								</div>`;

		personIcoPedido.appendChild(vElement);

	}

	consoleLog( vText, vVal ){

		const DOMConsole 	= document.querySelector('#wiz-jx-terminal');
		let vTagNum 		= this.nTagConsole;

		DOMConsole.innerHTML = `${DOMConsole.innerHTML}<div style="margin-top:3px;" ><a name="wiz-tag-${vTagNum}" style="color:blue" >~</a> <span style="color:pink" >»</span> ${vText} <b>${vVal}<b/></div>`;

		location.href = `#wiz-tag-${vTagNum}`;

		this.nTagConsole++;
	};

	ExecuteAllOrderTable( aVec ){

		let { id } = aVec;

		let vNode	= document.querySelector(`#jx-per-or-${id}`).childNodes;
		let vNodeTtal:number 	= vNode.length;

		for (let index = 0; index < vNodeTtal; index++) {
			
			let chilNod = vNode[index].childNodes[0];
		}
	}

	showAllWater(){

		const element =  document.querySelector('#wiz-jx-waiter-2');
		element.classList.add('animated', 'zoomInDown' , 'display-show');
		
		const element3 =  document.querySelector('#wiz-jx-waiter-3');
		element3.classList.add('animated', 'zoomInDown' , 'display-show');
	};

	async processOrder( vOrder:any[] , vTableNum:number ){

		await vOrder.forEach( async (element, index) => {

			let item = element.menu;
				
				this.consoleLog( `Entry Order table ${(vTableNum+1)} of the person ${(index+1)}`,``);
				this.createIconEntryOrder( item , index , vTableNum );
				
				await this.fonditaLoop.getOrders( item , index , vTableNum)
					.then((res) =>{

						this.changeToOrderServed(res);
					});

		});			
	};

	createIconEntryOrder( item , index:number , vTableNum:number ){

		let id:number 						= vTableNum;
		let modifyElement:HTMLDivElement 	= document.querySelector(`#jx-per-wa-${vTableNum}`);
		let vElement 						= document.createElement("div");
		vElement.className 					= 'col-3';
		let vMenuImag						= `https://web.artcompanysystem.com/public/platzi/entry.png`;
		
		let iconPedido = document.querySelector(`#wiz-jx-per-or-one-${id}-${index}`);
		iconPedido.classList.remove( 'animated' , 'flash' , 'infinite' );

		vElement.innerHTML = `<div id="wiz-jx-per-wa-one-${id}-${index}" title="Empezando el Pedido" class="wiz_table__spacetable__person-icon backg-yellow animated flash infinite" >
									<img id="wiz-jx-per-wa-one-${id}-${index}-img" class="wiz_table__spacetable__person-icon_img" src="${vMenuImag}" />
								</div>`;

		modifyElement.appendChild(vElement);
	
	};

	changeToOrderServed( res ){

		let { time , menu , table , personId } = res;
		time = (time /1000);

		let vEle:HTMLDivElement = document.querySelector(`#wiz-jx-per-wa-one-${res.table}-${res.personId}`);
		vEle.title 				= `Pedido servido en ${time}`;
		vEle.classList.remove( 'animated' , 'flash' , 'infinite' ,'backg-yellow');
		vEle.classList.add('backg-green');
		
		let vEleIco:HTMLImageElement  = document.querySelector(`#wiz-jx-per-wa-one-${res.table}-${res.personId}-img`);
		vEleIco.src 				  = `https://web.artcompanysystem.com/public/platzi/prepared.png`;

		this.consoleLog( `Order ${menu} from table ${(table+1)}, person ${(personId+1)} is ready`,``);

	}

	processOrderAsync( vOrder:any[] , vTableNum:number ){

		let ttalOrder:number = vOrder.length;

			/**-- esto es una chambonada -- */
			switch(ttalOrder){
				case 1:{

					this.processOrderAsyncSend1( vOrder , vTableNum);
				
				}break;

				case 2:{

					this.processOrderAsyncSend2( vOrder , vTableNum);
				
				}break;

				case 3:{

					this.processOrderAsyncSend3( vOrder , vTableNum);
				
				}break;

				case 4:{

					this.processOrderAsyncSend4( vOrder , vTableNum);
				
				}break;

			}
	};

	async processOrderAsyncSend1( vOrder , vTableNum:number){

		this.consoleLog( `Entry Order table ${(vTableNum+1)} of the person ${(0+1)}`,``);
		let vMenu1 = await this.entryOrden( vOrder , 0 , vTableNum );

			/** send order already */
			this.changeToOrderServed(vMenu1);
			this.consoleLog( `Order ${vOrder[0].menu} from table ${(vTableNum+1)}, person ${(0+1)} is ready`,``);


	};

	async processOrderAsyncSend2( vOrder , vTableNum:number){

		let vMenu1 = await this.entryOrden( vOrder , 0 , vTableNum );

		let vMenu2 = await this.entryOrden( vOrder , 1 , vTableNum );

			/** send order already */
			this.changeToOrderServed(vMenu1);
			this.changeToOrderServed(vMenu2);
	};

	async processOrderAsyncSend3( vOrder , vTableNum:number){

		let vMenu1 = await this.entryOrden( vOrder , 0 , vTableNum );
		let vMenu2 = await this.entryOrden( vOrder , 1 , vTableNum );
		let vMenu3 = await this.entryOrden( vOrder , 2 , vTableNum );

			/** send order already */
			this.changeToOrderServed(vMenu1);
			this.changeToOrderServed(vMenu2);
			this.changeToOrderServed(vMenu3);

	};

	async processOrderAsyncSend4( vOrder , vTableNum:number){

		let vMenu1 = await this.entryOrden( vOrder , 0 , vTableNum );
		let vMenu2 = await this.entryOrden( vOrder , 1 , vTableNum );
		let vMenu3 = await this.entryOrden( vOrder , 2 , vTableNum );
		let vMenu4 = await this.entryOrden( vOrder , 3 , vTableNum );

			/** send order already */
			this.changeToOrderServed(vMenu1);
			this.changeToOrderServed(vMenu2);
			this.changeToOrderServed(vMenu3);
			this.changeToOrderServed(vMenu4);

	};

	async entryOrden( vOrder ,peopleID:number, vTableNum:number){
		
		let index:number = peopleID;
		let item:string = vOrder[index].menu;
		this.createIconEntryOrder( item , index , vTableNum );

		let vMenu1 = await this.fonditaLoop.getOrders( vOrder[ index ].menu , index , vTableNum);

			return vMenu1;
	};


}


const vIndex = new index();