const minermodel=require('../Models/miner');
const BlockDataModel=require('../Models/BlockData');
const minerMapModel=require('../Models/minerMap');
let minermaps=[]

//let minerarray=[];
//let topminers=[];
//let minerMapData;
const tempDataModel=require('../Models/tempdata');
const randomGenerater=async function(req,res)
{
    var neededstake=0;
    var updatedstake=0;
    minermaps=[];
    //minerarray=[];
    const miners=await minermodel.find();
    miners.forEach(async mine=>{
        if(mine.stake <100)
        {
         neededstake=100-mine.stake;
            if(mine.reward>=neededstake)
            {
                updatedstake=neededstake;
                await minermodel.updateOne({name:mine.name},
                    {
                        $inc:{stake:neededstake}
                    })
                    await minermodel.updateOne({name:mine.name},
                        {
                            $inc:{reward:-neededstake}
                        })
            }
            else
            {
                await minermodel.deleteMany({name:mine.name})
               
            }
          
        }
    })
    await BlockDataModel.deleteMany({id:12345})
    const data=req.body;
    BlockDataModel.create(data);
    //console.log(miners);
    let i=34646453453;
    miners.forEach(async miner => {
   var key
   
    key= Math.floor(Math.random() * 10000);
    let minermap={
        "id":i++,
        "nameName":miner.name,
        "randomNumber":key,
    }
    if(miner.stake+updatedstake>=100)
    minermaps.push(minermap);
})
    res.json({
        minermaps
    })


}
/*minerarray=minerarray.sort(function(a,b){return a-b});
console.log(minerarray.length);
topminers=minerarray.slice(minerarray.length-4,minerarray.length);
let top=[]
for(i=0;i<topminers.length;i++)
{
top[i]=minermap[topminers[i]]
}
console.log(minerarray);
console.log(top);
console.log(minermap);
tempDataModel.insertMany({name:"lokya",priorityMiners:top});

//await minerMapModel.deleteMany({id:"lokya"},{new: true})
next()
}
const getdata=async function(req,res)
{
    minerMapData=await minerMapModel.find();
    res.json({
        minerMapData
    })
}*/
module.exports=randomGenerater