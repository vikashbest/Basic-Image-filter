var imgfile=null;
var origimg=null;
var grayimg=null;
var redimg=null;
var frameimg=null;
var rainbowimg=null;
var imgcvs=null;


function loadImage()
{
  imgfile= document.getElementById("finput");
  imgcvs = document.getElementById("cvs");
  origimg = new SimpleImage(imgfile);
   
  grayimg = new SimpleImage(imgfile);
  redimg = new SimpleImage(imgfile);
  frameimg = new SimpleImage(imgfile);
  rainbowimg = new SimpleImage(imgfile);
 
  origimg.drawTo(imgcvs);
}

function imageIsLoaded(img)
{
  if(img == null ||  ! img.complete())
    {
      alert("Image is not Loaded");
      return false;
    }
   else
     return true;
}

function doGray()
{
  if(imageIsLoaded(grayimg))
    {
      filterGray();
      grayimg.drawTo(imgcvs);
    }
}

function filterGray()
{
  for(var pixel of grayimg.values())
    {
      var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
      pixel.setRed(avg);
      pixel.setGreen(avg);
      pixel.setBlue(avg);
    }
}

function doReset()
{
  if(imageIsLoaded(origimg))
    {
      origimg.drawTo(imgcvs);
      
      grayimg = new SimpleImage(imgfile);
      redimg = new SimpleImage(imgfile);
      frameimg = new SimpleImage(imgfile);
    }
  
}

function doRed()
{
  if(imageIsLoaded(redimg))
    {
      for(var pix of redimg.values())
        {
          var avg = (pix.getRed()+pix.getGreen()+pix.getBlue())/3;
          if(avg < 128)
            {
              pix.setRed(2*avg);
              pix.setGreen(0);
              pix.setBlue(0);
            }
          else
          {
            pix.setRed(255);
            pix.setGreen((2*avg) - 255);
            pix.setBlue((2*avg) - 255);
            
          }
        }
    }
  redimg.drawTo(imgcvs);
  
}

function doFraming()
{
  var thickness;
  if(imageIsLoaded(frameimg))
    {
       var w = frameimg.width;
       var h = frameimg.height;
       thickness = 0.015*w;
    
    for(var pix of frameimg.values())
    {
        var x = pix.getX();
        var y = pix.getY();
        if( y < thickness || y > (h-thickness) || x < thickness || x > (w-thickness))
        {
            pix.setRed(255);
            pix.setGreen(215);
            pix.setBlue(0);
        }
        if( (x <=thickness+20 && y <= thickness+20) || 
            ((x >= (w-(thickness+20)) && y >=(h-(thickness+20)))) ||
            ((x >=(w-(thickness+20))) && y <= (thickness+20)) || 
            (y >=(h-(thickness+20)) && x <= thickness+20) )
        {
            pix.setRed(30);
            pix.setGreen(153);
            pix.setBlue(153);
        }
     
    }
     
      
      
    }
  frameimg.drawTo(imgcvs);

}

function doRainbow()
{
  if(imageIsLoaded(rainbowimg))
    {
      var h = rainbowimg.height;
      for(var pix of rainbowimg.values())
        {
          var y = pix.getY();
          var avg = (pix.getRed()+pix.getGreen()+pix.getBlue())/3;
          if(y < h/7)
            {
              if(avg<128)
                {
                  pix.setRed(2*avg);
                  pix.setGreen(0);
                  pix.setBlue(0);
                }
              else
                {
                  pix.setRed(255);
                  pix.setGreen(2*avg - 255);
                  pix.setBlue(2*avg - 255); 
                }
            }
          else if(y >=h/7 && y<(2*h)/7)
            {
              if(avg<128)
                {
                  pix.setRed(2*avg);
                  pix.setGreen(0.8*avg);
                  pix.setBlue(0);
                }
              else
                {
                  pix.setRed(255);
                  pix.setGreen(1.2*avg - 51);
                  pix.setBlue(2*avg - 255); 
                }
            }
          else if(y >=(2*h)/7 && y <(3*h)/7)
            {
              if(avg<128)
                {
                  pix.setRed(2*avg);
                  pix.setGreen(2*avg);
                  pix.setBlue(0);
                }
              else
                {
                  pix.setRed(255);
                  pix.setGreen(255);
                  pix.setBlue(2*avg - 255); 
                }
            }
          else if(y >=(3*h)/7 && y <(4*h)/7)
            {
              if(avg<128)
                {
                  pix.setRed(0);
                  pix.setGreen(2*avg);
                  pix.setBlue(0);
                }
              else
                {
                  pix.setRed(2*avg - 255);
                  pix.setGreen(255);
                  pix.setBlue(2*avg - 255); 
                }
            }
          else if(y >= (4*h)/7 && y<(5*h)/7)
            {
              if(avg<128)
                {
                  pix.setRed(0);
                  pix.setGreen(0);
                  pix.setBlue(2*avg);
                }
              else
                {
                  pix.setRed(2*avg - 255);
                  pix.setGreen(2*avg - 255);
                  pix.setBlue(255); 
                }
            }
          else if(y >=(5*h)/7 && y<(6*h)/7)
            {
              if(avg<128)
                {
                  pix.setRed(0.8*avg);
                  pix.setGreen(0);
                  pix.setBlue(2*avg);
                }
              else
                {
                  pix.setRed(1.2*avg - 51);
                  pix.setGreen(2*avg - 255);
                  pix.setBlue(255); 
                }
            }
          else{
            if(avg<128)
                {
                  pix.setRed(1.6*avg);
                  pix.setGreen(0);
                  pix.setBlue(1.6*avg);
                }
              else
                {
                  pix.setRed(0.4*avg + 153);
                  pix.setGreen(2*avg - 255);
                  pix.setBlue(0.4*avg + 153); 
                }
          }
        }
    }
  
  rainbowimg.drawTo(imgcvs);
}