module.exports = class Utility{	

	static convertTime(t){
        	t = Math.floor (t/1000);
                var s = t%60; t-=s;
                t = Math.floor (t/60);
                var m = t%60; t-=m;
                t = Math.floor (t/60);
                var h = t%60;
                if (h<10) h='0'+h;
                if (m<10) m='0'+m;
                if (s<10) s='0'+s;
                return h + ':' + m + ':' + s;
	}
}