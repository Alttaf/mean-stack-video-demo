mean-stack-video-demo
=====================

just a quick play around with the mean stack,
MONGO EXPRESS ANGULAR NODE

This is a simple video action dashboard page that displays video plays on another simple web page which performs posts and updates to the semi restful api.  It uses angular to make the restful calls and express to handle the routes storing data in a mongo collection, all runnning node of course 

<h2>Things you need </h2>
node js
bower
grunt-cli
mongodb
monk
apache - for the client
I will put full details on how to install of these soon



<h2>How to use</h2>
There are two repos associated with this project, mean-stack-video-demo and mean-stack-video-demo-client do a git clone onto your server using the mean-stack-video-demo repo this holds all the server code and everything assoicated with the dashboard.
mean-stack-video-demo
change all references to mean-video.alttaf.co.uk to wherever you are hosting it.  
after installing all of the above "things u need", do a 
<code>bower install</code> in the root of the repo, 
then run a 
<code>grunt serve</code>

mean-stack-video-demo-client
install apache and just dump this into the /var/www/html dir.  Make sure you change all references of ip addresses or mean-video.alttaf.co.uk to your ip address.  


<h2>Demo</h2>
Client : mean-video.alttaf.co.uk
Dashboard : mean-video.alttaf.co.uk:9000






