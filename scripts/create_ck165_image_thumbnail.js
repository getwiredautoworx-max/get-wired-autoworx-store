const sharp=require("sharp"),fs=require("fs"),path=require("path");
(async()=>{
 const src="catalogue-review/hertz-browser-image-candidates/ck-165-candidate-1.jpg";
 const outDir="catalogue-review/hertz-image-thumbnails";fs.mkdirSync(outDir,{recursive:true});
 const out=path.join(outDir,"ck-165-candidate-1-preview.jpg");
 const meta=await sharp(src).metadata();
 await sharp(src).resize({width:700,height:700,fit:"inside",withoutEnlargement:true}).jpeg({quality:88}).toFile(out);
 console.log(JSON.stringify({source:src,width:meta.width,height:meta.height,preview:out,previewBytes:fs.statSync(out).size}));
})().catch(e=>{console.error(e);process.exit(1);});
