goog.provide('taoensso.timbre');
taoensso.timbre.swap_config_BANG_ = (function taoensso$timbre$swap_config_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___42448 = arguments.length;
var i__5727__auto___42452 = (0);
while(true){
if((i__5727__auto___42452 < len__5726__auto___42448)){
args__5732__auto__.push((arguments[i__5727__auto___42452]));

var G__42455 = (i__5727__auto___42452 + (1));
i__5727__auto___42452 = G__42455;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return taoensso.timbre.swap_config_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(taoensso.timbre.swap_config_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (f,args){
return (taoensso.timbre._STAR_config_STAR_ = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(f,taoensso.timbre._STAR_config_STAR_,args));
}));

(taoensso.timbre.swap_config_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(taoensso.timbre.swap_config_BANG_.cljs$lang$applyTo = (function (seq41663){
var G__41664 = cljs.core.first(seq41663);
var seq41663__$1 = cljs.core.next(seq41663);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__41664,seq41663__$1);
}));

taoensso.timbre.set_config_BANG_ = (function taoensso$timbre$set_config_BANG_(config){
return taoensso.timbre.swap_config_BANG_((function (_old){
return config;
}));
});
taoensso.timbre.merge_config_BANG_ = (function taoensso$timbre$merge_config_BANG_(config){
return taoensso.timbre.swap_config_BANG_((function (old){
return taoensso.encore.nested_merge.cljs$core$IFn$_invoke$arity$2(old,config);
}));
});
var err_42477 = "Invalid Timbre logging level: should be e/o #{:trace :debug :info :warn :error :fatal :report}";
var level__GT_int_42478 = (function (p1__41676_SHARP_){
var G__41677 = p1__41676_SHARP_;
var G__41677__$1 = (((G__41677 instanceof cljs.core.Keyword))?G__41677.fqn:null);
switch (G__41677__$1) {
case "trace":
return (0);

break;
case "debug":
return (1);

break;
case "info":
return (2);

break;
case "warn":
return (3);

break;
case "error":
return (4);

break;
case "fatal":
return (5);

break;
case "report":
return (6);

break;
default:
return null;

}
});
taoensso.timbre.valid_level_QMARK_ = (function taoensso$timbre$valid_level_QMARK_(x){
if(cljs.core.truth_(level__GT_int_42478(x))){
return true;
} else {
return false;
}
});

taoensso.timbre.valid_level = (function taoensso$timbre$valid_level(x){
if(cljs.core.truth_(level__GT_int_42478(x))){
return x;
} else {
throw taoensso.truss.ex_info_STAR_("taoensso.timbre",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [55,52], null),err_42477,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"given","given",716253602),x,new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.type(x)], null),null);
}
});

taoensso.timbre.valid_level__GT_int = (function taoensso$timbre$valid_level__GT_int(x){
var or__5002__auto__ = level__GT_int_42478(x);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
throw taoensso.truss.ex_info_STAR_("taoensso.timbre",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [56,52], null),err_42477,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"given","given",716253602),x,new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.type(x)], null),null);
}
});
var valid_level__GT_int_42483 = taoensso.timbre.valid_level__GT_int;
/**
 * Implementation detail.
 */
taoensso.timbre.level_GT__EQ_ = (function taoensso$timbre$level_GT__EQ_(x,y){
return ((valid_level__GT_int_42483.cljs$core$IFn$_invoke$arity$1 ? valid_level__GT_int_42483.cljs$core$IFn$_invoke$arity$1(x) : valid_level__GT_int_42483.call(null, x)) >= (valid_level__GT_int_42483.cljs$core$IFn$_invoke$arity$1 ? valid_level__GT_int_42483.cljs$core$IFn$_invoke$arity$1(y) : valid_level__GT_int_42483.call(null, y)));
});
var fn_QMARK__42485 = cljs.core.fn_QMARK_;
var compile_42486 = taoensso.encore.fmemoize((function (x){
return taoensso.encore.name_filter(x);
}));
var conform_QMARK__STAR__42487 = taoensso.encore.fmemoize((function (x,ns){
var fexpr__41692 = compile_42486(x);
return (fexpr__41692.cljs$core$IFn$_invoke$arity$1 ? fexpr__41692.cljs$core$IFn$_invoke$arity$1(ns) : fexpr__41692.call(null, ns));
}));
var conform_QMARK__42488 = (function (ns_filter,ns){
if(cljs.core.truth_((fn_QMARK__42485.cljs$core$IFn$_invoke$arity$1 ? fn_QMARK__42485.cljs$core$IFn$_invoke$arity$1(ns_filter) : fn_QMARK__42485.call(null, ns_filter)))){
return (ns_filter.cljs$core$IFn$_invoke$arity$1 ? ns_filter.cljs$core$IFn$_invoke$arity$1(ns) : ns_filter.call(null, ns));
} else {
return conform_QMARK__STAR__42487(ns_filter,ns);
}
});
taoensso.timbre.may_log_ns_QMARK_ = (function taoensso$timbre$may_log_ns_QMARK_(ns_filter,ns){
if(cljs.core.truth_(conform_QMARK__42488(ns_filter,ns))){
return true;
} else {
return false;
}
});

/**
 * [[<ns-pattern> <min-level>] ... ["*" <default-min-level>]], ns -> ?min-level
 */
taoensso.timbre.ns__GT__QMARK_min_level = taoensso.encore.fmemoize((function (specs,ns){
return taoensso.encore.rsome.cljs$core$IFn$_invoke$arity$2((function (p__41697){
var vec__41698 = p__41697;
var ns_pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41698,(0),null);
var min_level = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41698,(1),null);
if(cljs.core.truth_(conform_QMARK__STAR__42487(ns_pattern,ns))){
return taoensso.timbre.valid_level(min_level);
} else {
return null;
}
}),specs);
}));
var valid_level_42493 = taoensso.timbre.valid_level;
var ns__GT__QMARK_min_level_42494 = taoensso.timbre.ns__GT__QMARK_min_level;
taoensso.timbre.get_min_level = (function taoensso$timbre$get_min_level(default$,x,ns){
var G__41721 = (function (){var or__5002__auto__ = ((cljs.core.vector_QMARK_(x))?ns__GT__QMARK_min_level_42494(x,ns):x);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return default$;
}
})();
return (valid_level_42493.cljs$core$IFn$_invoke$arity$1 ? valid_level_42493.cljs$core$IFn$_invoke$arity$1(G__41721) : valid_level_42493.call(null, G__41721));
});
var leglist_42496 = (function (x){
if(cljs.core.truth_(x)){
if(cljs.core.truth_((function (){var fexpr__41747 = cljs.core.PersistentHashSet.createAsIfByAssoc([cljs.core.PersistentVector.EMPTY,cljs.core.PersistentHashSet.EMPTY]);
return (fexpr__41747.cljs$core$IFn$_invoke$arity$1 ? fexpr__41747.cljs$core$IFn$_invoke$arity$1(x) : fexpr__41747.call(null, x));
})())){
return null;
} else {
return x;
}
} else {
return null;
}
});
taoensso.timbre.legacy_ns_filter = (function taoensso$timbre$legacy_ns_filter(ns_whitelist,ns_blacklist){
var ns_whitelist__$1 = leglist_42496(ns_whitelist);
var ns_blacklist__$1 = leglist_42496(ns_blacklist);
if(cljs.core.truth_((function (){var or__5002__auto__ = ns_whitelist__$1;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return ns_blacklist__$1;
}
})())){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"allow","allow",-1857325745),ns_whitelist__$1,new cljs.core.Keyword(null,"deny","deny",1589338523),ns_blacklist__$1], null);
} else {
return null;
}
});
var level_GT__EQ__42499 = taoensso.timbre.level_GT__EQ_;
var may_log_ns_QMARK__42500 = taoensso.timbre.may_log_ns_QMARK_;
var get_min_level_42501 = taoensso.timbre.get_min_level;
var legacy_ns_filter_42502 = taoensso.timbre.legacy_ns_filter;
/**
 * Private, don't use. Returns true iff level and ns are runtime unfiltered.
 */
taoensso.timbre.may_log_QMARK_ = (function taoensso$timbre$may_log_QMARK_(var_args){
var G__41812 = arguments.length;
switch (G__41812) {
case 1:
return taoensso.timbre.may_log_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return taoensso.timbre.may_log_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.timbre.may_log_QMARK_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return taoensso.timbre.may_log_QMARK_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(taoensso.timbre.may_log_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (level){
return taoensso.timbre.may_log_QMARK_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"trace","trace",-1082747415),level,null,null);
}));

(taoensso.timbre.may_log_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (level,_QMARK_ns_str){
return taoensso.timbre.may_log_QMARK_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"trace","trace",-1082747415),level,_QMARK_ns_str,null);
}));

(taoensso.timbre.may_log_QMARK_.cljs$core$IFn$_invoke$arity$3 = (function (level,_QMARK_ns_str,_QMARK_config){
return taoensso.timbre.may_log_QMARK_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"trace","trace",-1082747415),level,_QMARK_ns_str,_QMARK_config);
}));

(taoensso.timbre.may_log_QMARK_.cljs$core$IFn$_invoke$arity$4 = (function (default_min_level,level,_QMARK_ns_str,_QMARK_config){
var config = (function (){var or__5002__auto__ = _QMARK_config;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return taoensso.timbre._STAR_config_STAR_;
}
})();
var min_level = (function (){var G__41820 = default_min_level;
var G__41821 = (function (){var or__5002__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(config,new cljs.core.Keyword(null,"min-level","min-level",1634684919));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(config,new cljs.core.Keyword(null,"level","level",1290497552));
}
})();
var G__41822 = _QMARK_ns_str;
return (get_min_level_42501.cljs$core$IFn$_invoke$arity$3 ? get_min_level_42501.cljs$core$IFn$_invoke$arity$3(G__41820,G__41821,G__41822) : get_min_level_42501.call(null, G__41820,G__41821,G__41822));
})();
if(cljs.core.truth_((level_GT__EQ__42499.cljs$core$IFn$_invoke$arity$2 ? level_GT__EQ__42499.cljs$core$IFn$_invoke$arity$2(level,min_level) : level_GT__EQ__42499.call(null, level,min_level)))){
var temp__5823__auto__ = (function (){var or__5002__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(config,new cljs.core.Keyword(null,"ns-filter","ns-filter",108598448));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__41826 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(config,new cljs.core.Keyword(null,"ns-whitelist","ns-whitelist",-1717299774));
var G__41827 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(config,new cljs.core.Keyword(null,"ns-blacklist","ns-blacklist",1957763142));
return (legacy_ns_filter_42502.cljs$core$IFn$_invoke$arity$2 ? legacy_ns_filter_42502.cljs$core$IFn$_invoke$arity$2(G__41826,G__41827) : legacy_ns_filter_42502.call(null, G__41826,G__41827));
}
})();
if(cljs.core.truth_(temp__5823__auto__)){
var ns_filter = temp__5823__auto__;
if(cljs.core.truth_((may_log_ns_QMARK__42500.cljs$core$IFn$_invoke$arity$2 ? may_log_ns_QMARK__42500.cljs$core$IFn$_invoke$arity$2(ns_filter,_QMARK_ns_str) : may_log_ns_QMARK__42500.call(null, ns_filter,_QMARK_ns_str)))){
return true;
} else {
return false;
}
} else {
return true;
}
} else {
return false;
}
}));

(taoensso.timbre.may_log_QMARK_.cljs$lang$maxFixedArity = 4);

taoensso.timbre.set_min_level = (function taoensso$timbre$set_min_level(config,min_level){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(config,new cljs.core.Keyword(null,"min-level","min-level",1634684919),taoensso.timbre.valid_level(min_level));
});
taoensso.timbre.set_min_level_BANG_ = (function taoensso$timbre$set_min_level_BANG_(min_level){
return taoensso.timbre.swap_config_BANG_((function (old){
return taoensso.timbre.set_min_level(old,min_level);
}));
});
/**
 * Returns given Timbre `config` with its `:min-level` modified so that
 *   the given namespace has the specified minimum logging level.
 * 
 *   When no namespace is provided, `*ns*` will be used.
 *   When `?min-level` is nil, any minimum level specifications for the
 *   *exact* given namespace will be removed.
 * 
 *   See `*config*` docstring for more about `:min-level`.
 *   See also `set-min-level!` for a util to directly modify `*config*`.
 */
taoensso.timbre.set_ns_min_level = (function taoensso$timbre$set_ns_min_level(config,ns,_QMARK_min_level){
var ns__$1 = cljs.core.str.cljs$core$IFn$_invoke$arity$1((((!((ns == null))))?ns:taoensso.truss.failed_assertion_BANG_("taoensso.timbre",246,18,new cljs.core.Symbol("cljs.core","some?","cljs.core/some?",-440439360,null),new cljs.core.Symbol(null,"ns","ns",2082130287,null),ns,null,null)));
var min_level_STAR_ = (function (){var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(config,new cljs.core.Keyword(null,"min-level","min-level",1634684919));
if(cljs.core.vector_QMARK_(x)){
return x;
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["*",taoensso.timbre.valid_level(x)], null)], null);
}
})();
var min_level_STAR___$1 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__41848){
var vec__41850 = p__41848;
var ns_pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41850,(0),null);
var _pattern_min_level = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41850,(1),null);
var entry = vec__41850;
var temp__5823__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns_pattern,ns__$1)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns_pattern,cljs.core.PersistentHashSet.createAsIfByAssoc([ns__$1]))));
if(temp__5823__auto__){
var exact_match_QMARK_ = temp__5823__auto__;
return acc;
} else {
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,entry);
}
}),(function (){var temp__5823__auto__ = _QMARK_min_level;
if(cljs.core.truth_(temp__5823__auto__)){
var new_min_level = temp__5823__auto__;
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns__$1,taoensso.timbre.valid_level(new_min_level)], null)], null);
} else {
return cljs.core.PersistentVector.EMPTY;
}
})(),min_level_STAR_);
var min_level_STAR___$2 = (function (){var temp__5823__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(min_level_STAR___$1),(1)))?(function (){var vec__41857 = min_level_STAR___$1;
var vec__41860 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41857,(0),null);
var ns_pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41860,(0),null);
var level = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41860,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns_pattern,"*")){
return level;
} else {
return null;
}
})():null);
if(cljs.core.truth_(temp__5823__auto__)){
var simplified = temp__5823__auto__;
return simplified;
} else {
return cljs.core.not_empty(min_level_STAR___$1);
}
})();
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(config,new cljs.core.Keyword(null,"min-level","min-level",1634684919),min_level_STAR___$2);
});
if((typeof taoensso !== 'undefined') && (typeof taoensso.timbre !== 'undefined') && (typeof taoensso.timbre.get_rate_limiter !== 'undefined')){
} else {
taoensso.timbre.get_rate_limiter = taoensso.encore.fmemoize((function (appender_id,specs){
return taoensso.encore.rate_limiter.cljs$core$IFn$_invoke$arity$1(specs);
}));
}
taoensso.timbre.get_timestamp = (function taoensso$timbre$get_timestamp(timestamp_opts,instant){
var map__41903 = timestamp_opts;
var map__41903__$1 = cljs.core.__destructure_map(map__41903);
var pattern = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41903__$1,new cljs.core.Keyword(null,"pattern","pattern",242135423));
if(cljs.core.keyword_identical_QMARK_(pattern,new cljs.core.Keyword(null,"iso8601","iso8601",609352650))){
return (new Date(instant)).toISOString();
} else {
return (new goog.i18n.DateTimeFormat(pattern)).format(instant);
}
});
/**
 * General-purpose dynamic logging context
 */
taoensso.timbre._STAR_context_STAR_ = null;
/**
 * vargs -> [?err ?meta ?msg-fmt api-vargs]
 */
taoensso.timbre.parse_vargs = (function taoensso$timbre$parse_vargs(_QMARK_err,msg_type,vargs){
var auto_error_QMARK_ = cljs.core.keyword_identical_QMARK_(_QMARK_err,new cljs.core.Keyword(null,"auto","auto",-566279492));
var fmt_msg_QMARK_ = cljs.core.keyword_identical_QMARK_(msg_type,new cljs.core.Keyword(null,"f","f",-1597136552));
var vec__41923 = vargs;
var v0 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41923,(0),null);
if(cljs.core.truth_((function (){var and__5000__auto__ = auto_error_QMARK_;
if(and__5000__auto__){
return (taoensso.encore.error_QMARK_.cljs$core$IFn$_invoke$arity$1 ? taoensso.encore.error_QMARK_.cljs$core$IFn$_invoke$arity$1(v0) : taoensso.encore.error_QMARK_.call(null, v0));
} else {
return and__5000__auto__;
}
})())){
var _QMARK_err__$1 = v0;
var _QMARK_meta = null;
var vargs__$1 = taoensso.encore.vrest(vargs);
var _QMARK_msg_fmt = ((fmt_msg_QMARK_)?(function (){var vec__41927 = vargs__$1;
var v0__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41927,(0),null);
return v0__$1;
})():null);
var vargs__$2 = ((fmt_msg_QMARK_)?taoensso.encore.vrest(vargs__$1):vargs__$1);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [_QMARK_err__$1,_QMARK_meta,_QMARK_msg_fmt,vargs__$2], null);
} else {
var _QMARK_meta = (cljs.core.truth_((function (){var and__5000__auto__ = cljs.core.map_QMARK_(v0);
if(and__5000__auto__){
return new cljs.core.Keyword(null,"meta","meta",1499536964).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(v0));
} else {
return and__5000__auto__;
}
})())?v0:null);
var _QMARK_err__$1 = (function (){var or__5002__auto__ = new cljs.core.Keyword(null,"err","err",-2089457205).cljs$core$IFn$_invoke$arity$1(_QMARK_meta);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
if(auto_error_QMARK_){
return null;
} else {
return _QMARK_err;
}
}
})();
var _QMARK_meta__$1 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(_QMARK_meta,new cljs.core.Keyword(null,"err","err",-2089457205));
var vargs__$1 = (cljs.core.truth_(_QMARK_meta__$1)?taoensso.encore.vrest(vargs):vargs);
var _QMARK_msg_fmt = ((fmt_msg_QMARK_)?(function (){var vec__41933 = vargs__$1;
var v0__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41933,(0),null);
return v0__$1;
})():null);
var vargs__$2 = ((fmt_msg_QMARK_)?taoensso.encore.vrest(vargs__$1):vargs__$1);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [_QMARK_err__$1,_QMARK_meta__$1,_QMARK_msg_fmt,vargs__$2], null);
}
});
taoensso.timbre.protected_fn = (function taoensso$timbre$protected_fn(error_msg,f){
return (function (data){
try{return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(data) : f.call(null, data));
}catch (e41937){var t = e41937;
var map__41939 = data;
var map__41939__$1 = cljs.core.__destructure_map(map__41939);
var level = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41939__$1,new cljs.core.Keyword(null,"level","level",1290497552));
var _QMARK_ns_str = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41939__$1,new cljs.core.Keyword(null,"?ns-str","?ns-str",2012733966));
var _QMARK_file = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41939__$1,new cljs.core.Keyword(null,"?file","?file",1533429675));
var _QMARK_line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41939__$1,new cljs.core.Keyword(null,"?line","?line",-631853385));
throw taoensso.truss.ex_info_STAR_("taoensso.timbre",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [430,11], null),error_msg,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"output-fn","output-fn",1600951539),f,new cljs.core.Keyword(null,"level","level",1290497552),level,new cljs.core.Keyword(null,"loc","loc",-584284901),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ns","ns",441598760),_QMARK_ns_str,new cljs.core.Keyword(null,"file","file",-1269645878),_QMARK_file,new cljs.core.Keyword(null,"line","line",212345235),_QMARK_line], null),new cljs.core.Keyword(null,"log-data","log-data",1563839042),data], null),t);
}});
});



/**
 * Core low-level log fn. Private, don't use!
 */
taoensso.timbre._log_BANG_ = (function taoensso$timbre$_log_BANG_(var_args){
var G__41947 = arguments.length;
switch (G__41947) {
case 9:
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$9((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]),(arguments[(8)]));

break;
case 10:
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$10((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]),(arguments[(8)]),(arguments[(9)]));

break;
case 11:
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]),(arguments[(8)]),(arguments[(9)]),(arguments[(10)]));

break;
case 12:
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$12((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]),(arguments[(8)]),(arguments[(9)]),(arguments[(10)]),(arguments[(11)]));

break;
case 14:
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]),(arguments[(7)]),(arguments[(8)]),(arguments[(9)]),(arguments[(10)]),(arguments[(11)]),(arguments[(12)]),(arguments[(13)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$9 = (function (config,level,_QMARK_ns_str,_QMARK_file,_QMARK_line,msg_type,_QMARK_err,vargs_,_QMARK_base_data){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(config,level,_QMARK_ns_str,_QMARK_file,_QMARK_line,null,msg_type,_QMARK_err,vargs_,_QMARK_base_data,null,false,null,null);
}));

(taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$10 = (function (config,level,_QMARK_ns_str,_QMARK_file,_QMARK_line,msg_type,_QMARK_err,vargs_,_QMARK_base_data,callsite_id){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(config,level,_QMARK_ns_str,_QMARK_file,_QMARK_line,null,msg_type,_QMARK_err,vargs_,_QMARK_base_data,callsite_id,false,null,null);
}));

(taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11 = (function (config,level,_QMARK_ns_str,_QMARK_file,_QMARK_line,msg_type,_QMARK_err,vargs_,_QMARK_base_data,callsite_id,spying_QMARK_){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(config,level,_QMARK_ns_str,_QMARK_file,_QMARK_line,null,msg_type,_QMARK_err,vargs_,_QMARK_base_data,callsite_id,spying_QMARK_,null,null);
}));

(taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$12 = (function (config,level,_QMARK_ns_str,_QMARK_file,_QMARK_line,_QMARK_column,msg_type,_QMARK_err,vargs_,_QMARK_base_data,callsite_id,spying_QMARK_){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(config,level,_QMARK_ns_str,_QMARK_file,_QMARK_line,_QMARK_column,msg_type,_QMARK_err,vargs_,_QMARK_base_data,callsite_id,spying_QMARK_,null,null);
}));

(taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14 = (function (config,level,_QMARK_ns_str,_QMARK_file,_QMARK_line,_QMARK_column,msg_type,_QMARK_err,vargs_,_QMARK_base_data,callsite_id,spying_QMARK_,instant,may_log){
if(cljs.core.truth_((function (){var or__5002__auto__ = may_log;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return taoensso.timbre.may_log_QMARK_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"trace","trace",-1082747415),level,_QMARK_ns_str,config);
}
})())){
var instant_42538__$1 = (function (){var or__5002__auto__ = instant;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (new Date());
}
})();
var context_42539 = taoensso.timbre._STAR_context_STAR_;
var vargs_42540 = cljs.core.deref(vargs_);
var vec__41954_42541 = taoensso.timbre.parse_vargs(_QMARK_err,msg_type,vargs_42540);
var _QMARK_err_42542__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41954_42541,(0),null);
var _QMARK_meta_42543 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41954_42541,(1),null);
var _QMARK_msg_fmt_42544 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41954_42541,(2),null);
var vargs_42545__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41954_42541,(3),null);
var data_42546 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2((function (){var or__5002__auto__ = _QMARK_base_data;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})(),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"instant","instant",655498374),new cljs.core.Keyword(null,"spying?","spying?",1753444487),new cljs.core.Keyword(null,"config","config",994861415),new cljs.core.Keyword(null,"vargs","vargs",-966597273),new cljs.core.Keyword(null,"?file","?file",1533429675),new cljs.core.Keyword(null,"error-level?","error-level?",778415885),new cljs.core.Keyword(null,"?ns-str","?ns-str",2012733966),new cljs.core.Keyword(null,"level","level",1290497552),new cljs.core.Keyword(null,"msg-type","msg-type",-2132567822),new cljs.core.Keyword(null,"?err","?err",549653299),new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"?line","?line",-631853385),new cljs.core.Keyword(null,"?meta","?meta",-793560773),new cljs.core.Keyword(null,"?msg-fmt","?msg-fmt",-852453891),new cljs.core.Keyword(null,"?column","?column",1004649085)],[instant_42538__$1,spying_QMARK_,config,vargs_42545__$1,_QMARK_file,cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"fatal","fatal",1874419888),null,new cljs.core.Keyword(null,"error","error",-978969032),null], null), null),level),_QMARK_ns_str,level,msg_type,_QMARK_err_42542__$1,context_42539,_QMARK_line,_QMARK_meta_42543,_QMARK_msg_fmt_42544,_QMARK_column]));
var _QMARK_data_42547 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,mf){
var result = (mf.cljs$core$IFn$_invoke$arity$1 ? mf.cljs$core$IFn$_invoke$arity$1(acc) : mf.call(null, acc));
if((result == null)){
return cljs.core.reduced(null);
} else {
return result;
}
}),data_42546,cljs.core.get.cljs$core$IFn$_invoke$arity$2(config,new cljs.core.Keyword(null,"middleware","middleware",1462115504)));
var temp__5825__auto___42549 = _QMARK_data_42547;
if(cljs.core.truth_(temp__5825__auto___42549)){
var data_42550__$1 = temp__5825__auto___42549;
var map__41967_42551 = data_42550__$1;
var map__41967_42552__$1 = cljs.core.__destructure_map(map__41967_42551);
var level_42553__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41967_42552__$1,new cljs.core.Keyword(null,"level","level",1290497552));
var vargs_42554__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41967_42552__$1,new cljs.core.Keyword(null,"vargs","vargs",-966597273));
var data_42555__$2 = taoensso.encore.assoc_nx.cljs$core$IFn$_invoke$arity$variadic(data_42550__$1,new cljs.core.Keyword(null,"msg_","msg_",-1925147000),(new cljs.core.Delay((function (){
return taoensso.timbre.protected_fn("Timbre error when calling (msg-fn <data>)",taoensso.timbre.default_output_msg_fn)(data_42550__$1);
}),null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hash_","hash_",-827203612),(new cljs.core.Delay((function (){
return cljs.core.hash((function (){var b2__30954__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(_QMARK_meta_42543,new cljs.core.Keyword(null,"id","id",-1388402092));
if(cljs.core.truth_(b2__30954__auto__)){
var id = b2__30954__auto__;
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [id,callsite_id,level_42553__$1], null);
} else {
var b2__30954__auto____$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(_QMARK_meta_42543,new cljs.core.Keyword(null,"id!","id!",218090956));
if(cljs.core.truth_(b2__30954__auto____$1)){
var id = b2__30954__auto____$1;
return id;
} else {
var b2__30954__auto____$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(_QMARK_meta_42543,new cljs.core.Keyword(null,"hash","hash",-13781596));
if(cljs.core.truth_(b2__30954__auto____$2)){
var h = b2__30954__auto____$2;
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [h,callsite_id,_QMARK_msg_fmt_42544,level_42553__$1], null);
} else {
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [vargs_42554__$2,callsite_id,_QMARK_msg_fmt_42544,level_42553__$1], null);
}
}
}
})());
}),null))], 0));
var get_timestamp_delay_42556 = (function (){var get_shared_delay = taoensso.encore.fmemoize((function (opts){
return (new cljs.core.Delay((function (){
return taoensso.timbre.get_timestamp(opts,cljs.core.get.cljs$core$IFn$_invoke$arity$2(data_42555__$2,new cljs.core.Keyword(null,"instant","instant",655498374)));
}),null));
}));
var base_opts_ = (new cljs.core.Delay((function (){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(taoensso.timbre.default_timestamp_opts,cljs.core.get.cljs$core$IFn$_invoke$arity$2(config,new cljs.core.Keyword(null,"timestamp-opts","timestamp-opts",-1359534807)));
}),null));
return (function (_QMARK_appender_opts){
if((((_QMARK_appender_opts == null)) || (cljs.core.keyword_identical_QMARK_(_QMARK_appender_opts,new cljs.core.Keyword(null,"inherit","inherit",-1840815422))))){
return get_shared_delay(cljs.core.deref(base_opts_));
} else {
return get_shared_delay(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(base_opts_),_QMARK_appender_opts));
}
});
})();
var get_output_fn_42557 = (function (){var base_fn = taoensso.encore.fmemoize(cljs.core.get.cljs$core$IFn$_invoke$arity$3(config,new cljs.core.Keyword(null,"output-fn","output-fn",1600951539),taoensso.timbre.default_output_fn));
return (function (_QMARK_appender_fn){
return taoensso.timbre.protected_fn("Timbre error when calling (output-fn <data>)",(((((_QMARK_appender_fn == null)) || (cljs.core.keyword_identical_QMARK_(_QMARK_appender_fn,new cljs.core.Keyword(null,"inherit","inherit",-1840815422)))))?base_fn:_QMARK_appender_fn));
});
})();
var base_output_opts_42558 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(config,new cljs.core.Keyword(null,"output-opts","output-opts",-793411325));
cljs.core.reduce_kv((function (_,id,appender){
if(cljs.core.truth_((function (){var and__5000__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(appender,new cljs.core.Keyword(null,"enabled?","enabled?",-1376075057));
if(cljs.core.truth_(and__5000__auto__)){
return taoensso.timbre.may_log_QMARK_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"trace","trace",-1082747415),level_42553__$1,_QMARK_ns_str,appender);
} else {
return and__5000__auto__;
}
})())){
var rate_limit_specs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(appender,new cljs.core.Keyword(null,"rate-limit","rate-limit",1748082022));
var rate_limit_okay_QMARK_ = (function (){var or__5002__auto__ = cljs.core.empty_QMARK_(rate_limit_specs);
if(or__5002__auto__){
return or__5002__auto__;
} else {
var rl_fn = taoensso.timbre.get_rate_limiter(id,rate_limit_specs);
return cljs.core.not((function (){var G__41999 = cljs.core.force(cljs.core.get.cljs$core$IFn$_invoke$arity$2(data_42555__$2,new cljs.core.Keyword(null,"hash_","hash_",-827203612)));
return (rl_fn.cljs$core$IFn$_invoke$arity$1 ? rl_fn.cljs$core$IFn$_invoke$arity$1(G__41999) : rl_fn.call(null, G__41999));
})());
}
})();
if(rate_limit_okay_QMARK_){
var map__42000 = appender;
var map__42000__$1 = cljs.core.__destructure_map(map__42000);
var apfn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42000__$1,new cljs.core.Keyword(null,"fn","fn",-1175266204));
var async_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42000__$1,new cljs.core.Keyword(null,"async?","async?",1523057758));
var timestamp_ = get_timestamp_delay_42556(cljs.core.get.cljs$core$IFn$_invoke$arity$2(appender,new cljs.core.Keyword(null,"timestamp-opts","timestamp-opts",-1359534807)));
var output_fn = get_output_fn_42557(cljs.core.get.cljs$core$IFn$_invoke$arity$2(appender,new cljs.core.Keyword(null,"output-fn","output-fn",1600951539)));
var output_opts = (function (){var or__5002__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(appender,new cljs.core.Keyword(null,"output-opts","output-opts",-793411325));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return base_output_opts_42558;
}
})();
var output_ = (new cljs.core.Delay((function (){
var G__42001 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(data_42555__$2,new cljs.core.Keyword(null,"timestamp_","timestamp_",-954533417),timestamp_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"output-opts","output-opts",-793411325),output_opts], 0));
return (output_fn.cljs$core$IFn$_invoke$arity$1 ? output_fn.cljs$core$IFn$_invoke$arity$1(G__42001) : output_fn.call(null, G__42001));
}),null));
var data__$3 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(data_42555__$2,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"appender-id","appender-id",-1917983538),id,new cljs.core.Keyword(null,"appender","appender",1267426510),appender,new cljs.core.Keyword(null,"output-opts","output-opts",-793411325),output_opts,new cljs.core.Keyword(null,"output-fn","output-fn",1600951539),output_fn,new cljs.core.Keyword(null,"output_","output_",-36797880),output_,new cljs.core.Keyword(null,"timestamp_","timestamp_",-954533417),timestamp_], null));
var _QMARK_data__$1 = (function (){var temp__5823__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(appender,new cljs.core.Keyword(null,"middleware-fn","middleware-fn",-61585752));
if(cljs.core.truth_(temp__5823__auto__)){
var mfn = temp__5823__auto__;
return (mfn.cljs$core$IFn$_invoke$arity$1 ? mfn.cljs$core$IFn$_invoke$arity$1(data__$3) : mfn.call(null, data__$3));
} else {
return data__$3;
}
})();
var temp__5825__auto____$1 = _QMARK_data__$1;
if(cljs.core.truth_(temp__5825__auto____$1)){
var data__$4 = temp__5825__auto____$1;
return (apfn.cljs$core$IFn$_invoke$arity$1 ? apfn.cljs$core$IFn$_invoke$arity$1(data__$4) : apfn.call(null, data__$4));
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
}),null,cljs.core.get.cljs$core$IFn$_invoke$arity$2(config,new cljs.core.Keyword(null,"appenders","appenders",1245583998)));
} else {
}
} else {
}

return null;
}));

(taoensso.timbre._log_BANG_.cljs$lang$maxFixedArity = 14);

if((typeof taoensso !== 'undefined') && (typeof taoensso.timbre !== 'undefined') && (typeof taoensso.timbre.callsite_counter !== 'undefined')){
} else {
/**
 * Simple counter, used to uniquely identify each log macro expansion.
 */
taoensso.timbre.callsite_counter = taoensso.encore.counter.cljs$core$IFn$_invoke$arity$0();
}
/**
 * Used as fallback error-fn
 */
taoensso.timbre.pr_error = (function taoensso$timbre$pr_error(error){
try{return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([error], 0));
}catch (e42085){var _pr_str_error = e42085;
try{return cljs.core.str.cljs$core$IFn$_invoke$arity$1(error);
}catch (e42086){var _str_error = e42086;
return "<pr-error failed>";
}}});
/**
 * Default (fn [data]) -> final output string, used to produce
 *   final formatted output_ string from final log data.
 * 
 *   Options (included as `:output-opts` in data sent to fns below):
 * 
 *  :error-fn ; When present and (:?err data) present,
 *            ; (error-fn data) will be called to generate output
 *            ; (e.g. a stacktrace) for the error.
 *            ;
 *            ; Default value: `default-output-error-fn`.
 *            ; Use `nil` value to exclude error output.
 * 
 *  :msg-fn   ; When present, (msg-fn data) will be called to
 *            ; generate a message from `vargs` (vector of raw
 *            ; logging arguments).
 *            ;
 *            ; Default value: `default-output-msg-fn`.
 *            ; Use `nil` value to exclude message output.
 */
taoensso.timbre.default_output_fn = (function taoensso$timbre$default_output_fn(var_args){
var G__42098 = arguments.length;
switch (G__42098) {
case 2:
return taoensso.timbre.default_output_fn.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return taoensso.timbre.default_output_fn.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(taoensso.timbre.default_output_fn.cljs$core$IFn$_invoke$arity$2 = (function (base_output_opts,data){
var data__$1 = ((cljs.core.empty_QMARK_(base_output_opts))?data:cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data,new cljs.core.Keyword(null,"output-opts","output-opts",-793411325),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(base_output_opts,cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.Keyword(null,"output-opts","output-opts",-793411325)))));
return taoensso.timbre.default_output_fn.cljs$core$IFn$_invoke$arity$1(data__$1);
}));

(taoensso.timbre.default_output_fn.cljs$core$IFn$_invoke$arity$1 = (function (data){
var map__42126 = data;
var map__42126__$1 = cljs.core.__destructure_map(map__42126);
var level = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42126__$1,new cljs.core.Keyword(null,"level","level",1290497552));
var _QMARK_err = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42126__$1,new cljs.core.Keyword(null,"?err","?err",549653299));
var _QMARK_ns_str = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42126__$1,new cljs.core.Keyword(null,"?ns-str","?ns-str",2012733966));
var _QMARK_file = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42126__$1,new cljs.core.Keyword(null,"?file","?file",1533429675));
var hostname_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42126__$1,new cljs.core.Keyword(null,"hostname_","hostname_",-2091647379));
var timestamp_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42126__$1,new cljs.core.Keyword(null,"timestamp_","timestamp_",-954533417));
var _QMARK_line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42126__$1,new cljs.core.Keyword(null,"?line","?line",-631853385));
var output_opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42126__$1,new cljs.core.Keyword(null,"output-opts","output-opts",-793411325));
return [(function (){var temp__5825__auto__ = cljs.core.force(timestamp_);
if(cljs.core.truth_(temp__5825__auto__)){
var ts = temp__5825__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ts)," "].join('');
} else {
return null;
}
})(),clojure.string.upper_case(cljs.core.name(level))," ",(function (){var temp__5825__auto__ = (function (){var or__5002__auto__ = _QMARK_ns_str;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return _QMARK_file;
}
})();
if(cljs.core.truth_(temp__5825__auto__)){
var loc = temp__5825__auto__;
return ["[",cljs.core.str.cljs$core$IFn$_invoke$arity$1(loc),(function (){var temp__5825__auto____$1 = _QMARK_line;
if(cljs.core.truth_(temp__5825__auto____$1)){
var line = temp__5825__auto____$1;
return [":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line)].join('');
} else {
return null;
}
})(),"]"].join('');
} else {
return null;
}
})()," - ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var temp__5825__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(output_opts,new cljs.core.Keyword(null,"msg-fn","msg-fn",-1873033940),taoensso.timbre.default_output_msg_fn);
if(cljs.core.truth_(temp__5825__auto__)){
var msg_fn = temp__5825__auto__;
return (msg_fn.cljs$core$IFn$_invoke$arity$1 ? msg_fn.cljs$core$IFn$_invoke$arity$1(data) : msg_fn.call(null, data));
} else {
return null;
}
})()),cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var temp__5825__auto__ = _QMARK_err;
if(cljs.core.truth_(temp__5825__auto__)){
var err = temp__5825__auto__;
var temp__5825__auto____$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$3(output_opts,new cljs.core.Keyword(null,"error-fn","error-fn",-171437615),taoensso.timbre.default_output_error_fn);
if(cljs.core.truth_(temp__5825__auto____$1)){
var ef = temp__5825__auto____$1;
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(output_opts,new cljs.core.Keyword(null,"no-stacktrace?","no-stacktrace?",1701072694)))){
return null;
} else {
var nl = "\n";
try{return [nl,cljs.core.str.cljs$core$IFn$_invoke$arity$1((ef.cljs$core$IFn$_invoke$arity$1 ? ef.cljs$core$IFn$_invoke$arity$1(data) : ef.call(null, data)))].join('');
}catch (e42146){var ef_error = e42146;
return [nl,"[TIMBRE WARNING]: `error-fn` failed, falling back to `pr-error`.",nl,"`error-fn` error: ",nl,cljs.core.str.cljs$core$IFn$_invoke$arity$1(taoensso.timbre.pr_error(ef_error)),nl,nl," Original error (given to `error-fn`): ",nl,cljs.core.str.cljs$core$IFn$_invoke$arity$1(taoensso.timbre.pr_error(err))].join('');
}}
} else {
return null;
}
} else {
return null;
}
})())].join('');
}));

(taoensso.timbre.default_output_fn.cljs$lang$maxFixedArity = 2);

taoensso.timbre.default_arg__GT_str_fn = (function taoensso$timbre$default_arg__GT_str_fn(x){
if((x == null)){
return "nil";
} else {
if(typeof x === 'string'){
return x;
} else {
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([x], 0));
}
}
});
taoensso.timbre.legacy_arg__GT_str_fn = (function taoensso$timbre$legacy_arg__GT_str_fn(x){
if((x == null)){
return "nil";
} else {
if(cljs.core.record_QMARK_(x)){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([x], 0));
} else {
return x;
}
}
});
taoensso.timbre.str_join = (function taoensso$timbre$str_join(var_args){
var G__42212 = arguments.length;
switch (G__42212) {
case 1:
return taoensso.timbre.str_join.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return taoensso.timbre.str_join.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(taoensso.timbre.str_join.cljs$core$IFn$_invoke$arity$1 = (function (xs){
return taoensso.timbre.str_join.cljs$core$IFn$_invoke$arity$2(taoensso.timbre.default_arg__GT_str_fn,xs);
}));

(taoensso.timbre.str_join.cljs$core$IFn$_invoke$arity$2 = (function (arg__GT_str_fn,xs){
return taoensso.encore.str_join.cljs$core$IFn$_invoke$arity$3(" ",cljs.core.map.cljs$core$IFn$_invoke$arity$1(arg__GT_str_fn),xs);
}));

(taoensso.timbre.str_join.cljs$lang$maxFixedArity = 2);

/**
 * (fn [data]) -> string, used by `default-output-fn` to generate output
 *   for `:vargs` value (vector of raw logging arguments) in log data.
 */
taoensso.timbre.default_output_msg_fn = (function taoensso$timbre$default_output_msg_fn(p__42252){
var map__42253 = p__42252;
var map__42253__$1 = cljs.core.__destructure_map(map__42253);
var data = map__42253__$1;
var msg_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42253__$1,new cljs.core.Keyword(null,"msg-type","msg-type",-2132567822));
var _QMARK_msg_fmt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42253__$1,new cljs.core.Keyword(null,"?msg-fmt","?msg-fmt",-852453891));
var vargs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42253__$1,new cljs.core.Keyword(null,"vargs","vargs",-966597273));
var output_opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42253__$1,new cljs.core.Keyword(null,"output-opts","output-opts",-793411325));
var map__42262 = output_opts;
var map__42262__$1 = cljs.core.__destructure_map(map__42262);
var arg__GT_str_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__42262__$1,new cljs.core.Keyword(null,"arg->str-fn","arg->str-fn",2064845310),taoensso.timbre.default_arg__GT_str_fn);
var G__42265 = msg_type;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__42265)){
return "";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"p","p",151049309),G__42265)){
return taoensso.timbre.str_join.cljs$core$IFn$_invoke$arity$2(arg__GT_str_fn,vargs);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"f","f",-1597136552),G__42265)){
if(typeof _QMARK_msg_fmt === 'string'){
return taoensso.encore.format_STAR_.cljs$core$IFn$_invoke$arity$2(_QMARK_msg_fmt,vargs);
} else {
throw taoensso.truss.ex_info_STAR_("taoensso.timbre",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [899,9], null),"Timbre format-style logging call without a format pattern string",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"?msg-fmt","?msg-fmt",-852453891),_QMARK_msg_fmt,new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.type(_QMARK_msg_fmt),new cljs.core.Keyword(null,"vargs","vargs",-966597273),vargs], null),null);
}
} else {
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__42265)].join('')));

}
}
}
});
/**
 * Default (fn [data]) -> string, used by `default-output-fn` to
 *   generate output for `:?err` value in log data.
 * 
 *   For Clj:
 *   Uses `org.clj-commons/pretty` to return an attractive stacktrace.
 *   Options:
 *     :stacktrace-fonts ; See `clj-commons.format.exceptions/*fonts*`
 * 
 *   For Cljs:
 *   Returns simple stacktrace string.
 */
taoensso.timbre.default_output_error_fn = (function taoensso$timbre$default_output_error_fn(p__42291){
var map__42292 = p__42291;
var map__42292__$1 = cljs.core.__destructure_map(map__42292);
var data = map__42292__$1;
var _QMARK_err = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42292__$1,new cljs.core.Keyword(null,"?err","?err",549653299));
var output_opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42292__$1,new cljs.core.Keyword(null,"output-opts","output-opts",-793411325));
var err = (((!((_QMARK_err == null))))?_QMARK_err:taoensso.truss.failed_assertion_BANG_("taoensso.timbre",949,13,new cljs.core.Symbol("cljs.core","some?","cljs.core/some?",-440439360,null),new cljs.core.Symbol(null,"?err","?err",-2104782470,null),_QMARK_err,null,null));
var nl = "\n";
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(err.stack),(function (){var temp__5825__auto__ = cljs.core.ex_data(err);
if(cljs.core.truth_(temp__5825__auto__)){
var d = temp__5825__auto__;
return [nl,"ex-data:",nl,"    ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([d], 0))].join('');
} else {
return null;
}
})(),(function (){var temp__5825__auto__ = cljs.core.ex_cause(err);
if(cljs.core.truth_(temp__5825__auto__)){
var c = temp__5825__auto__;
return [nl,nl,"Caused by:",nl,cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__42356 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(data,new cljs.core.Keyword(null,"?err","?err",549653299),c);
return (taoensso.timbre.default_output_error_fn.cljs$core$IFn$_invoke$arity$1 ? taoensso.timbre.default_output_error_fn.cljs$core$IFn$_invoke$arity$1(G__42356) : taoensso.timbre.default_output_error_fn.call(null, G__42356));
})())].join('');
} else {
return null;
}
})()].join('');
});
/**
 * Alpha, subject to change.
 * 
 *   Iterates through all appenders in config (enabled or not), and
 *   calls (:shutdown-fn appender) whenever that fn exists.
 * 
 *   This signals to these appenders that they should immediately
 *   close/release any resources that they may have open/acquired,
 *   and permanently noop on future logging requests.
 * 
 *   Returns the set of appender-ids that had a shutdown-fn called.
 * 
 *   This fn is called automatically on JVM shutdown, but can also
 *   be called manually.
 */
taoensso.timbre.shutdown_appenders_BANG_ = (function taoensso$timbre$shutdown_appenders_BANG_(var_args){
var G__42363 = arguments.length;
switch (G__42363) {
case 0:
return taoensso.timbre.shutdown_appenders_BANG_.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return taoensso.timbre.shutdown_appenders_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(taoensso.timbre.shutdown_appenders_BANG_.cljs$core$IFn$_invoke$arity$0 = (function (){
return taoensso.timbre.shutdown_appenders_BANG_.cljs$core$IFn$_invoke$arity$1(taoensso.timbre._STAR_config_STAR_);
}));

(taoensso.timbre.shutdown_appenders_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (config){
return cljs.core.reduce_kv((function (acc,appender_id,appender){
var temp__5823__auto__ = new cljs.core.Keyword(null,"shutdown-fn","shutdown-fn",-1360269181).cljs$core$IFn$_invoke$arity$1(appender);
if(cljs.core.truth_(temp__5823__auto__)){
var sfn = temp__5823__auto__;
(sfn.cljs$core$IFn$_invoke$arity$0 ? sfn.cljs$core$IFn$_invoke$arity$0() : sfn.call(null, ));

return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,appender_id);
} else {
return acc;
}
}),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"appenders","appenders",1245583998).cljs$core$IFn$_invoke$arity$1(config));
}));

(taoensso.timbre.shutdown_appenders_BANG_.cljs$lang$maxFixedArity = 1);

taoensso.timbre.println_appender = taoensso.timbre.appenders.core.println_appender;
taoensso.timbre.console_appender = taoensso.timbre.appenders.core.console_appender;
/**
 * Controls (:timestamp_ data)
 */
taoensso.timbre.default_timestamp_opts = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"pattern","pattern",242135423),new cljs.core.Keyword(null,"iso8601","iso8601",609352650)], null);
/**
 * Default/example Timbre `*config*` value:
 * 
 *  {:min-level :debug #_[["taoensso.*" :error] ["*" :debug]]
 *   :ns-filter #{"*"} #_{:deny #{"taoensso.*"} :allow #{"*"}}
 * 
 *   :middleware [] ; (fns [data]) -> ?data, applied left->right
 * 
 *   :timestamp-opts default-timestamp-opts ; {:pattern _ :locale _ :timezone _}
 *   :output-fn default-output-fn ; (fn [data]) -> final output for use by appenders
 * 
 *   :appenders
 *   #?(:clj
 *      {:println (println-appender {:stream :auto})
 *       ;; :spit (spit-appender    {:fname "./timbre-spit.log"})
 *       }
 * 
 *      :cljs
 *      (if (exists? js/window)
 *        {:console (console-appender {})}
 *        {:println (println-appender {})}))}
 * 
 *  See `*config*` for more info.
 */
taoensso.timbre.default_config = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"min-level","min-level",1634684919),new cljs.core.Keyword(null,"debug","debug",-1608172596),new cljs.core.Keyword(null,"ns-filter","ns-filter",108598448),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["*",null], null), null),new cljs.core.Keyword(null,"middleware","middleware",1462115504),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"timestamp-opts","timestamp-opts",-1359534807),taoensso.timbre.default_timestamp_opts,new cljs.core.Keyword(null,"output-fn","output-fn",1600951539),taoensso.timbre.default_output_fn,new cljs.core.Keyword(null,"appenders","appenders",1245583998),(((typeof window !== 'undefined'))?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"console","console",1228072057),(function (){var G__42375 = cljs.core.PersistentArrayMap.EMPTY;
return (taoensso.timbre.console_appender.cljs$core$IFn$_invoke$arity$1 ? taoensso.timbre.console_appender.cljs$core$IFn$_invoke$arity$1(G__42375) : taoensso.timbre.console_appender.call(null, G__42375));
})()], null):new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"println","println",1920840330),(function (){var G__42379 = cljs.core.PersistentArrayMap.EMPTY;
return (taoensso.timbre.println_appender.cljs$core$IFn$_invoke$arity$1 ? taoensso.timbre.println_appender.cljs$core$IFn$_invoke$arity$1(G__42379) : taoensso.timbre.println_appender.call(null, G__42379));
})()], null))], null);
if((typeof taoensso !== 'undefined') && (typeof taoensso.timbre !== 'undefined') && (typeof taoensso.timbre._STAR_config_STAR_ !== 'undefined')){
} else {
/**
 * This config map controls all Timbre behaviour including:
 *  - When to log (via min-level and namespace filtering)
 *  - How  to log (which appenders to use, etc.)
 *  - What to log (how log data will be transformed to final
 *                 output for use by appenders)
 * 
 *   Initial config value will be (in descending order of preference):
 * 
 *  1. `taoensso.timbre.config.edn`   JVM property  (read as EDN)
 *  2. `TAOENSSO_TIMBRE_CONFIG_EDN`   Env var       (read as EDN)
 *  3. `./taoensso.timbre.config.edn` resource file (read as EDN)
 *  4. Value of `default-config`
 * 
 *   For all EDN cases (1-3): the EDN can represent either a Clojure map
 *   to merge into `default-config`, or a qualified symbol that'll
 *   resolve to a Clojure map to merge into `default-config`.
 * 
 *   See `default-config` for more info on the base/default config.
 * 
 *   You can modify the config value with standard `alter-var-root`,
 *   or `binding`.
 * 
 *   For convenience, there's also some dedicated helper utils:
 * 
 *  - `set-config!`, `merge-config!`        ; Mutate *config*
 *  - `set-min-level!`, `set-ns-min-level!` ; Mutate *config* :min-level
 *  - `with-config`, `with-merged-config`   ; Bind *config*
 *  - `with-min-level`                      ; Bind *config* :min-level
 * 
 *   MAIN CONFIG OPTIONS
 *  :min-level
 *    Logging will occur only if a logging call's level is >= this
 *    min-level. Possible values, in order:
 * 
 *      :trace  = level 0
 *      :debug  = level 1 ; Default min-level
 *      :info   = level 2
 *      :warn   = level 3
 *      :error  = level 4 ; Error type
 *      :fatal  = level 5 ; Error type
 *      :report = level 6 ; High general-purpose (non-error) type
 * 
 *    It's also possible to set a namespace-specific min-level by
 *    providing a vector that maps `ns-pattern`s to min-levels, e.g.:
 *    `[[#{"taoensso.*"} :error] ... [#{"*"} :debug]]`.
 * 
 *    Example `ns-pattern`s:
 *      #{}, "*", "foo.bar", "foo.bar.*", #{"foo" "bar.*"},
 *      {:allow #{"foo" "bar.*"} :deny #{"foo.*.bar.*"}}.
 * 
 *    See also `set-ns-min-level!` for a helper tool.
 * 
 *  :ns-filter
 *    Logging will occur only if a logging call's namespace is permitted
 *    by this ns-filter. Possible values:
 * 
 *      - Arbitrary (fn may-log-ns? [ns]) predicate fn.
 *      - An `ns-pattern` (see :min-level docs above).
 * 
 *    Useful for turning off logging in noisy libraries, etc.
 * 
 *  :middleware
 *    Vector of simple (fn [data]) -> ?new-data fns (applied left->right)
 *    that transform the data map dispatched to appender fns. If any middleware
 *    returns nil, NO dispatch will occur (i.e. the event will be filtered).
 * 
 *    Useful for layering advanced functionality. Similar to Ring middleware.
 * 
 *  :timestamp-opts ; Config map, see `default-timestamp-opts`
 *  :output-fn      ; (fn [data]) -> final output for use by appenders,
 *                  ; see `default-output-fn` for example
 *  :output-opts    ; Optional map added to data sent to output-fn
 * 
 *  :appenders ; {<appender-id> <appender-map>}
 * 
 *    Where each appender-map has keys:
 *      :enabled?        ; Must be truthy to log
 *      :min-level       ; Optional *additional* appender-specific min-level
 *      :ns-filter       ; Optional *additional* appender-specific ns-filter
 * 
 *      :async?          ; Dispatch using agent? Useful for slow appenders (Clj only)
 *                       ; Tip: consider calling (shutdown-agents) as part of your
 *                       ; application shutdown if you have this enabled for any
 *                       ; appenders.
 * 
 *      :rate-limit      ; [[<ncalls-limit> <window-msecs>] ...], or nil
 *                       ; Appender will noop a call after exceeding given number
 *                       ; of the "same" calls within given rolling window/s.
 *                       ;
 *                       ; Example:
 *                       ;   [[100  (encore/ms :mins  1)]
 *                       ;    [1000 (encore/ms :hours 1)]] will noop a call after:
 *                       ;
 *                       ;   - >100  "same" calls in 1 rolling minute, or
 *                       ;   - >1000 "same" calls in 1 rolling hour
 *                       ;
 *                       ; "Same" calls are identified by default as the
 *                       ; combined hash of:
 *                       ;   - Callsite (i.e. each individual Timbre macro form)
 *                       ;   - Logging level
 *                       ;   - All arguments provided for logging
 *                       ;
 *                       ; You can manually override call identification:
 *                       ;   (timbre/infof ^:meta {:id "my-limiter-call-id"} ...)
 *                       ;
 * 
 *      :timestamp-opts  ; Optional appender-specific override for top-level option
 *      :output-fn       ; Optional appender-specific override for top-level option
 *      :output-opts     ; Optional appender-specific override for top-level option
 * 
 *      :fn              ; (fn [data]) -> side-effects, with keys described below
 * 
 *   LOG DATA
 *  A single map with keys:
 *    :config          ; Entire active config map
 *    :context         ; `*context*` value at log time (see `with-context`)
 *    :appender-id     ; Id of appender currently dispatching
 *    :appender        ; Entire map of appender currently dispatching
 *    :instant         ; Platform date (java.util.Date or js/Date)
 *    :level           ; Call's level keyword (e.g. :info) (>= active min-level)
 *    :error-level?    ; Is level e/o #{:error :fatal}?
 *    :spying?         ; Is call occuring via the `spy` macro?
 *    :?ns-str         ; String,  or nil
 *    :?file           ; String,  or nil
 *    :?line           ; Integer, or nil
 *    :?column         ; Integer, or nil
 *    :?err            ; First-arg platform error, or nil
 *    :?meta           ; First-arg map when it has ^:meta metadata, used as a
 *                       way of passing advanced per-call options to appenders
 *    :vargs           ; Vector of raw args provided to logging call
 *    :timestamp_      ; Forceable - string
 *    :hostname_       ; Forceable - string (Clj only)
 *    :output-fn       ; (fn [data]) -> final output for use by appenders
 *    :output_         ; Forceable result of calling (output-fn <this-data-map>)
 * 
 *    **NB** - any keys not specifically documented here should be
 *    considered private / subject to change without notice.
 * 
 *   COMPILE-TIME LEVEL/NS ELISION
 *  To control :min-level and :ns-filter at compile-time, use:
 * 
 *    - `taoensso.timbre.min-level.edn`  JVM property (read as EDN)
 *    - `taoensso.timbre.ns-pattern.edn` JVM property (read as EDN)
 * 
 *    - `TAOENSSO_TIMBRE_MIN_LEVEL_EDN`  env var      (read as EDN)
 *    - `TAOENSSO_TIMBRE_NS_PATTERN_EDN` env var      (read as EDN)
 * 
 *  Note that compile-time options will OVERRIDE options in `*config*`.
 * 
 *  NB: only simple (keyword) compile-time min-level's are supported,
 *  you CANNOT currently use the syntax for namespace-specific levels
 *  here.
 * 
 *   DEBUGGING INITIAL CONFIG
 *  See `:_init-config` for information re: Timbre's config on initial load.
 */
taoensso.timbre._STAR_config_STAR_ = taoensso.timbre.default_config;
}
taoensso.timbre.console__QMARK_appender = taoensso.timbre.appenders.core.console_appender;

taoensso.timbre.ordered_levels = new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"trace","trace",-1082747415),new cljs.core.Keyword(null,"debug","debug",-1608172596),new cljs.core.Keyword(null,"info","info",-317069002),new cljs.core.Keyword(null,"warn","warn",-436710552),new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"fatal","fatal",1874419888),new cljs.core.Keyword(null,"report","report",1394055010)], null);

taoensso.timbre.log_QMARK_ = taoensso.timbre.may_log_QMARK_;

/**
 * Prefer `default-config`.
 */
taoensso.timbre.example_config = taoensso.timbre.default_config;

taoensso.timbre.logging_enabled_QMARK_ = (function taoensso$timbre$logging_enabled_QMARK_(level,compile_time_ns){
return taoensso.timbre.may_log_QMARK_.cljs$core$IFn$_invoke$arity$2(level,cljs.core.str.cljs$core$IFn$_invoke$arity$1(compile_time_ns));
});

taoensso.timbre.str_println = (function taoensso$timbre$str_println(var_args){
var args__5732__auto__ = [];
var len__5726__auto___42580 = arguments.length;
var i__5727__auto___42581 = (0);
while(true){
if((i__5727__auto___42581 < len__5726__auto___42580)){
args__5732__auto__.push((arguments[i__5727__auto___42581]));

var G__42582 = (i__5727__auto___42581 + (1));
i__5727__auto___42581 = G__42582;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return taoensso.timbre.str_println.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(taoensso.timbre.str_println.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
return taoensso.timbre.str_join.cljs$core$IFn$_invoke$arity$1(xs);
}));

(taoensso.timbre.str_println.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(taoensso.timbre.str_println.cljs$lang$applyTo = (function (seq42407){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq42407));
}));


/**
 * Prefer `set-min-level!.`
 */
taoensso.timbre.set_level_BANG_ = (function taoensso$timbre$set_level_BANG_(level){
return taoensso.timbre.swap_config_BANG_((function (m){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.Keyword(null,"min-level","min-level",1634684919),level);
}));
});

/**
 * Prefer `default-output-error-fn`.
 */
taoensso.timbre.stacktrace = (function taoensso$timbre$stacktrace(var_args){
var G__42425 = arguments.length;
switch (G__42425) {
case 1:
return taoensso.timbre.stacktrace.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return taoensso.timbre.stacktrace.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(taoensso.timbre.stacktrace.cljs$core$IFn$_invoke$arity$1 = (function (err){
return taoensso.timbre.stacktrace.cljs$core$IFn$_invoke$arity$2(err,null);
}));

(taoensso.timbre.stacktrace.cljs$core$IFn$_invoke$arity$2 = (function (err,opts){
return taoensso.timbre.default_output_error_fn(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"?err","?err",549653299),err,new cljs.core.Keyword(null,"output-opts","output-opts",-793411325),opts], null));
}));

(taoensso.timbre.stacktrace.cljs$lang$maxFixedArity = 2);


//# sourceMappingURL=taoensso.timbre.js.map
