class FonditaLoop{

    private nTimeInit:number = 1000;
    private nTimeFin:number = 8000;
    private nThisTime:number;
    private aMenu:any;
    private aPerson:any;
  
    /**
     *constructo of the FonditaLoop class
     * @memberof FonditaLoop
     */
    constructor(){

    }

    getRandomTimeOrder ():number{

        const vA = +this.nTimeInit;
        const vB = this.nTimeFin;

            return this.getOneNumberRamdon( vA , vB );
    };

    getOneNumberRamdon( vA:number , vB:number ):number{

        let nRamdon = Math.random();
        return Math.floor(nRamdon*(vB-vA)+(vA));
    };

    getTable():Object{

        return [
            {
                name :"Mesa 1",
                nameshort:"M.1",
                maxperson: 3
            },{
                name :"Mesa 2",
                nameshort:"M.2",
                maxperson: 2
            },{
                name :"Mesa 3",
                nameshort:"M.3",
                maxperson: 2
            },{
                name :"Mesa 4",
                nameshort:"M.4",
                maxperson: 2
            },{
                name :"Mesa 5",
                nameshort:"M.5",
                maxperson: 2
            }
        ];
    };

    getTableTotal():number{

        return this.getTable.length;
    };

    getMenu():Object{
        return [
            {
                name: "Combo Hamburguesa",
                pict: "https://web.artcompanysystem.com/public/platzi/hamburger.jpg",
            },{
                name: "Combo Hot Dogs",
                pict: "https://web.artcompanysystem.com/public/platzi/hot-dog.jpg",
            },{
                name: "Combo Pizza",
                pict: "https://web.artcompanysystem.com/public/platzi/pizza.JPEG",
            }
        ];
    };

    getPerson():Object{
        return [
            {
                name: "Luis Sanchez",
                pict: "",
            },{
                name: "J.O Waldner",
                pict: "",
            },{
                name: "Jorgen Person",
                pict: "",
            },{
                name: "Kin tam Su",
                pict: "",
            },{
                name: "Liu Golian",
                pict: "",
            },{
                name: "Hernesto Macias",
                pict: "",
            },{
                name: "Gustavo Bolivar",
                pict: "",
            }
        ];
    };

    getOnlyMenu():Promise<Object>{

        this.aMenu              = this.getMenu();
        const ttalMenu:number   = this.aMenu.length;
        const nSelect:number    = this.getOneNumberRamdon( 0, ( ttalMenu));
        return this.aMenu[ nSelect ];

    };

    async getOnlyPerson():Promise<Object>{

        this.aPerson            = this.getPerson();
        const ttalPerson:number = this.aPerson.length;
        const nSelect:number    = await this.getOneNumberRamdon( 0, ( ttalPerson - 1));

            return this.aPerson[ nSelect ];

    };

    getOrders(product, personId:number , table:number):Object{

        let nThisTime:number = this.getRandomTimeOrder();
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    menu: product,
                    table:table,
                    personId:personId,
                    time:nThisTime
                });
                    //resolve(`=== Pedido servido: ${product}, tiempo de preparación ${time}ms para la ${table}`);

            }, nThisTime);
        });
    }

    getPeopleReserved():number{

        let ttalPerson:number   = this.getOneNumberRamdon( 1, 5 );

            console.log('total personas**************' , ttalPerson);
            return ttalPerson;
    }

    

}

export default FonditaLoop;