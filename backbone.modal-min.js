(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},b={}.hasOwnProperty,c=function(a,c){function d(){this.constructor=a}for(var e in c)b.call(c,e)&&(a[e]=c[e]);return d.prototype=c.prototype,a.prototype=new d,a.__super__=c.prototype,a},d=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};!function(a,b){var c;if("object"==typeof exports)return c=require("backbone"),module.exports=b(c);if("function"==typeof define&&define.amd)return define(["backbone"],b);if("undefined"==typeof Backbone||null===Backbone)throw new Error("Backbone is not defined. Please include the latest version from http://documentcloud.github.com/backbone/backbone.js");return b(Backbone)}(this,function(b){return b.Modal=function(e){function f(){this.triggerCancel=a(this.triggerCancel,this),this.triggerSubmit=a(this.triggerSubmit,this),this.triggerView=a(this.triggerView,this),this.clickOutside=a(this.clickOutside,this),this.checkKey=a(this.checkKey,this),this.args=Array.prototype.slice.apply(arguments),b.View.prototype.constructor.apply(this,this.args),this.setUIElements(),this.delegateModalEvents()}return c(f,e),f.prototype.prefix="bbm",f.prototype.animate=!0,f.prototype.render=function(a){var c,d,e,f=this;return d=this.serializeData(),this.$el.addClass(""+this.prefix+"-wrapper"),this.modalEl=b.$("<div />").addClass(""+this.prefix+"-modal"),this.template&&this.modalEl.html(this.template(d)),this.$el.html(this.modalEl),b.$("body").on("keyup",this.checkKey),b.$("body").on("click",this.clickOutside),this.viewContainer?(this.viewContainerEl=this.modalEl.find(this.viewContainer),this.viewContainerEl.addClass(""+this.prefix+"-modal__views")):this.viewContainerEl=this.modalEl,this.$el.show(),(null!=(e=this.views)?e.length:void 0)>0&&this.openAt(a||0),"function"==typeof this.onRender&&this.onRender(),c=this.getOption("animate"),this.$el.fadeIn&&c?(this.modalEl.css({opacity:0}),this.$el.fadeIn({duration:100,complete:function(){var a;return f.modalEl.css({opacity:1}).addClass(""+f.prefix+"-modal--open"),"function"==typeof f.onShow&&f.onShow(),null!=(a=f.currentView)&&"function"==typeof a.onShow?a.onShow():void 0}})):this.modalEl.addClass(""+this.prefix+"-modal--open"),this},f.prototype.setUIElements=function(){var a;if(this.template=this.getOption("template"),this.views=this.getOption("views"),null!=(a=this.views)&&(a.length=_.size(this.views)),this.viewContainer=this.getOption("viewContainer"),this.$el.hide(),_.isUndefined(this.template)&&_.isUndefined(this.views))throw new Error("No template or views defined for Backbone.Modal");if(this.template&&this.views&&_.isUndefined(this.viewContainer))throw new Error("No viewContainer defined for Backbone.Modal")},f.prototype.getOption=function(a){return a?this.options&&d.call(this.options,a)>=0&&null!=this.options[a]?this.options[a]:this[a]:void 0},f.prototype.serializeData=function(){var a;return a={},this.model&&(a=_.extend(a,this.model.toJSON())),this.collection&&(a=_.extend(a,{items:this.collection.toJSON()})),a},f.prototype.delegateModalEvents=function(){var a,b,c,d,e,f,g;this.active=!0,a=this.getOption("cancelEl"),e=this.getOption("submitEl"),e&&this.$el.on("click",e,this.triggerSubmit),a&&this.$el.on("click",a,this.triggerCancel),g=[];for(b in this.views)_.isString(b)&&"length"!==b?(c=b.match(/^(\S+)\s*(.*)$/),f=c[1],d=c[2],g.push(this.$el.on(f,d,this.views[b],this.triggerView))):g.push(void 0);return g},f.prototype.undelegateModalEvents=function(){var a,b,c,d,e,f,g;this.active=!1,a=this.getOption("cancelEl"),e=this.getOption("submitEl"),e&&this.$el.off("click",e,this.triggerSubmit),a&&this.$el.off("click",a,this.triggerCancel),g=[];for(b in this.views)_.isString(b)&&"length"!==b?(c=b.match(/^(\S+)\s*(.*)$/),f=c[1],d=c[2],g.push(this.$el.off(f,d,this.views[b],this.triggerView))):g.push(void 0);return g},f.prototype.checkKey=function(a){if(this.active)switch(a.keyCode){case 27:return this.triggerCancel(a);case 13:return this.triggerSubmit(a)}},f.prototype.clickOutside=function(a){return b.$(a.target).hasClass(""+this.prefix+"-wrapper")&&this.active?this.triggerCancel(null,!0):void 0},f.prototype.buildView=function(a,c){var d;if(a)return c&&_.isFunction(c)&&(c=c()),_.isFunction(a)?(d=new a(c||this.args[0]),d instanceof b.View?{el:d.render().$el,view:d}:{el:a(c||this.args[0])}):{view:a,el:a.$el}},f.prototype.triggerView=function(a){var b,c,d,e,f,g,h;if(null!=a&&"function"==typeof a.preventDefault&&a.preventDefault(),e=a.data,c=this.buildView(e.view,e.viewOptions),this.currentView&&(this.previousView=this.currentView,!(null!=(h=e.openOptions)?h.skipSubmit:void 0))){if(("function"==typeof(f=this.previousView).beforeSubmit?f.beforeSubmit():void 0)===!1)return;"function"==typeof(g=this.previousView).submit&&g.submit()}this.currentView=c.view||c.el,b=0;for(d in this.views)e.view===this.views[d].view&&(this.currentIndex=b),b++;return e.onActive&&(_.isFunction(e.onActive)?e.onActive(this):_.isString(e.onActive)&&this[e.onActive].call(this,e)),this.shouldAnimate?this.animateToView(c.el):(this.shouldAnimate=!0,this.$(this.viewContainerEl).html(c.el))},f.prototype.animateToView=function(a){var c,d,e,f,g,h,i,j=this;return f={position:"relative",top:-9999,left:-9999},g=b.$("<tester/>").css(f),g.html(this.$el.clone().css(f)),0!==b.$("tester").length?b.$("tester").replaceWith(g):b.$("body").append(g),c=g.find(this.viewContainer?this.viewContainer:"."+this.prefix+"-modal"),c.removeAttr("style"),e=c.outerHeight(),c.html(a),d=c.outerHeight(),e===d?(this.$(this.viewContainerEl).html(a),"function"==typeof(h=this.currentView).onShow&&h.onShow(),null!=(i=this.previousView)&&"function"==typeof i.close?i.close():void 0):(this.$(this.viewContainerEl).css({opacity:0}),this.$(this.viewContainerEl).animate({height:d},100,function(){var b,c;return j.$(j.viewContainerEl).css({opacity:1}).removeAttr("style"),j.$(j.viewContainerEl).html(a),"function"==typeof(b=j.currentView).onShow&&b.onShow(),null!=(c=j.previousView)&&"function"==typeof c.close?c.close():void 0}))},f.prototype.triggerSubmit=function(a){var b;return null!=a&&a.preventDefault(),(this.beforeSubmit?this.beforeSubmit()===!1:0)||(this.currentView&&this.currentView.beforeSubmit?this.currentView.beforeSubmit()===!1:0)?void 0:(null!=(b=this.currentView)&&"function"==typeof b.submit&&b.submit(),"function"==typeof this.submit&&this.submit(),this.regionEnabled?this.trigger("modal:close"):this.close())},f.prototype.triggerCancel=function(a){return null!=a&&a.preventDefault(),(this.beforeCancel?this.beforeCancel()===!1:0)?void 0:("function"==typeof this.cancel&&this.cancel(),this.regionEnabled?this.trigger("modal:close"):this.close())},f.prototype.close=function(){var a,c,d=this;return b.$("body").off("keyup",this.checkKey),b.$("body").off("click",this.clickOutside),"function"==typeof this.onClose&&this.onClose(),this.shouldAnimate=!1,this.modalEl.addClass(""+this.prefix+"-modal--close"),c=function(){var a;return null!=(a=d.currentView)&&"function"==typeof a.remove&&a.remove(),d.remove()},a=this.getOption("animate"),this.$el.fadeOut&&a?(this.$el.fadeOut({duration:200}),_.delay(function(){return c()},200)):c()},f.prototype.openAt=function(a){var b,c,d,e,f;_.isNumber(a)?b=a:_.isNumber(a._index)&&(b=a._index),d=0;for(e in this.views)if("length"!==e)if(_.isNumber(b))d===b&&(f=this.views[e]),d++;else if(_.isObject(a))for(c in this.views[e])a[c]===this.views[e][c]&&(f=this.views[e]);return f&&(this.currentIndex=_.indexOf(this.views,f),this.triggerView({data:_.extend(f,{openOptions:a})})),this},f.prototype.next=function(a){return null==a&&(a={}),this.currentIndex+1<this.views.length?this.openAt(_.extend(a,{_index:this.currentIndex+1})):void 0},f.prototype.previous=function(a){return null==a&&(a={}),this.currentIndex-1<this.views.length-1?this.openAt(_.extend(a,{_index:this.currentIndex-1})):void 0},f}(b.View)})}).call(this);