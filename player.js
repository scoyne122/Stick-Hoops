function Player(t){function i(){l?s():n()}function n(){r?ball.fly():y&&(ohh.play(),ball.blocked())}function s(){var t=a.getX()/-22.6667+80,i=a.getX()+t,n=dist(i,p,a.getY(),m);l=!1,y=!1,n<60?ball.dunk(a):ball.setShotStuff(a)}function e(){p<=0+X/2.7?(f=!0,c=!1):p>=800-X/2.7?(b=!0,g=!1):(b||f)&&(b=!1,f=!1,g=!0,c=!0)}function h(){M>=max&&!unlimited&&(pause=!0,endGame(t))}function o(){v&&(m+=B+=.5),m>=330&&(B=0,v=!1)}this.pic=new Image,this.pic.src="player"+t+".png";var u,a,r=!1,l=!1,c=!0,g=!0,f=!1,b=!0,p=650,m=330,X=140,d=[!1,!1,!1,!1],v=!1,B=0,Y=0,y=!1,M=0;!function(){1==t?(u=[37,38,39,40],a=hoop1):(u=[65,87,68,83],p=150,a=hoop2)}(),this.getX=function(){return p},this.getY=function(){return m},this.getHeight=function(){return 160},this.getWidth=function(){return X},this.isInAir=function(){return v},this.getHasBall=function(){return l},this.getCanSteal=function(){return r},this.getCanBlock=function(){return y},this.getBallDist=function(t){return Y},this.getScore=function(){return M},this.canRight=function(){return g},this.canLeft=function(){return c},this.hasBall=function(){return l},this.getVy=function(){return B};var I=function(){d[0]&&c&&!f?p-=7:d[2]&&g&&!b&&(p+=7),d[1]&&!v&&k(),d[3]&&(d[3]=!1,i())},k=function(){B=-15,v=!0};this.jump=function(){k()},this.steal=function(){n()},this.shoot=function(){s()},this.keyDown=function(t){for(var i=0;i<d.length;i++)t==u[i]&&(0!=i&&2!=i||(Y=30*i-30,d[i+2*(1-i)]=!1),d[i]=!0)},this.keyUp=function(t){for(var i in d)t==u[i]&&(d[i]=!1)},this.free=function(){g=!0,c=!0},this.cantGo=function(t){"left"==t?c=!1:"right"==t&&(g=!1)},this.setHasBall=function(t){l=t},this.setCanSteal=function(t){r=t},this.setCanBlock=function(t){y=t},this.getBuckets=function(){M++,h()},this.setX=function(t){p=t},this.noKeys=function(){u=[]},this.act=function(){I(),o(),e()},this.act2=null}function Ball(){function t(){a-=.004,(u+=l)>.4&&o>360?u*=-.8:o>360&&(u=0),(h<=0+r||h>=800-r)&&(a*=-1),a<=.1&&a>=-.1&&(a=0),o+=u,h+=a}function i(){c.isInAir()?(o=c.getY(),h=c.getX(),g||(g=!0)):(g&&(g=!1,u=4.2,o=330),4.2!=u&&-4.2!=u&&(u=4.2),h=c.getX()+c.getBallDist(),((o+=u)>360||o<330)&&(u*=-1))}function n(){o<110&&o>110-u&&u>0?(a=0,u=0,f=!1,p=!1,b=c,cheer.play(),c.getBuckets(),c=null):(o+=u,h+=a,u+=l,e++),(h<=0||h>=800)&&(a*=-1)}function s(t,i,n){var e=t+i,h=i+l;return e<110&&e>110-i&&i>0?n+1:s(e,h,n+1)}this.pic=new Image,this.pic.src="ball.png";var e,h=400,o=100,u=0,a=0,r=50,l=.4,c=null,g=!1,f=!1,b=null,p=!1;this.getX=function(){return h},this.getY=function(){return o},this.getVy=function(){return u},this.getHeight=function(){return 50},this.getWidth=function(){return r},this.getOwner=function(){return c},this.getPossessed=function(){return f},this.getBallTo=function(){return b},this.isShooting=function(){return p},this.getOwner=function(){return c},this.posess=function(t){t.isInAir()||(o=330,u=4.2),c=t,f=!0},this.fly=function(){a=20*Math.random()-10,o=c.getY()-50,u=-13,c.setHasBall(!1),c=null,p=!1,f=!1,b=null},this.blocked=function(){a*=-1,u=0,f=!1,b=null,p=!1,c=null},this.setShotStuff=function(t){f=!1;var i=t.getY()-o,n=(distObj(this,t),t.getX()/-22.6667+80),r=t.getX()+n-h,c=(i-190)/11;e=-c,e=0,a=r/s(o,u=l*c,0),p=!0},this.dunk=function(t){f=!1,p=!0,o=t.getY()-1;var i=t.getX()/-22.6667+80;h=t.getX()+i,u=2,a=0,n(),horn.play(),showDunk()},this.act=function(){f||p?p&&!f?n():i():t()}}function Hoop(t){this.pic=new Image,this.pic.src="hoop"+t+".png";var i=680*(t-1);this.getX=function(){return i},this.getY=function(){return 110},this.getHeight=function(){return 350},this.getWidth=function(){return 450}}function computerPlayer(){function t(){null!=ball.getOwner()||s||ball.getBallTo()==this?null!=ball.getOwner()&&s&&(s=!1):Math.random()<.05&&(s=!0)}this.inheritFrom=Player,this.inheritFrom(2),this.noKeys();var i=150,n=0,s=!1,n=0;this.getBallDist=function(){return n},this.move=function(t){(this.canRight()&&t>0||this.canLeft()&&t<0)&&(this.setX(i+=t),n=i/Math.abs(i)*30)},this.moveToBall=function(){var t=ball.getX()-i,n=ball.getY()-330;Math.abs(t)>7&&this.move(t/Math.abs(t)*7),n<-50&&!this.isInAir()&&Math.abs(t)<50&&ball.getVy()<10&&this.jump()},this.defend=function(){var t=200-i,n=Math.abs(t)/t*7,s=dist(me.getX(),hoop1.getX()+80,me.getY(),hoop1.getY()),e=distObj(this,me);s<10||e<200?this.goToPlayer():Math.abs(t)>7&&this.setX(i+=n),Math.random()<.1&&this.steal()},this.shouldBlock=function(){var t=dist(ball.getX(),hoop1.getX()+80,ball.getY(),hoop1.getY()),n=distObj(ball,this),s=ball.getX()-i;i-(hoop1.getX()+80)>7&&n>250&&this.setX(i-=7),t<300&&!this.isInAir()&&n<420?this.jump():n<250&&!this.isInAir()?this.jump():n<250&&Math.abs(s)>7&&this.setX(i+=Math.abs(s)/s*7),this.steal()},this.goToPlayer=function(){var t=me.getX()-i;if(Math.abs(t)>7){var n=Math.abs(t)/t*7;this.setX(i+=n)}me.isInAir()&&!this.isInAir()&&Math.random()<.1&&this.jump()},this.offense=function(){var t=hoop2.getX()+40-i,n=distObj(this,me);dist(ball.getX(),hoop2.getX()+40,ball.getY(),hoop2.getY())<50&&this.shoot(),Math.abs(t)<300&&!this.isInAir()&&this.jump(),n>120?this.goToHoop():n<113&&this.isInAir()?this.goToHoop(!1):me.isInAir()||this.isInAir()||this.jump(),this.getY()+160<me.getY()?this.shoot():me.getX()-i<80&&this.getY()+100<me.getY()?this.shoot():this.getY()<me.getY()&&me.getVy()>0&&this.shoot()},this.goToHoop=function(t){var n=hoop2.getX()+40-i,s=Math.abs(n)/n*7;!1===t&&(s*=-1),(s<0&&this.canLeft()||s>0&&this.canRight())&&n>7&&this.setX(i+=s)},this.act2=function(){t(),s&&ball.getBallTo()!=this?this.moveToBall():ball.getOwner()==this&&this.hasBall()?this.offense():ball.getOwner()==me&&me.hasBall()?this.defend():ball.isShooting()&&ball.getOwner()!=this&&this.shouldBlock()}}
