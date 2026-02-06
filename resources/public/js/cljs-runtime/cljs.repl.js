goog.provide('cljs.repl');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__45444){
var map__45445 = p__45444;
var map__45445__$1 = cljs.core.__destructure_map(map__45445);
var m = map__45445__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45445__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45445__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var or__5002__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return [(function (){var temp__5825__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5825__auto__)){
var ns = temp__5825__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})()], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__45455_45644 = cljs.core.seq(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__45457_45645 = null;
var count__45458_45646 = (0);
var i__45459_45647 = (0);
while(true){
if((i__45459_45647 < count__45458_45646)){
var f_45648 = chunk__45457_45645.cljs$core$IIndexed$_nth$arity$2(null, i__45459_45647);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_45648], 0));


var G__45649 = seq__45455_45644;
var G__45650 = chunk__45457_45645;
var G__45651 = count__45458_45646;
var G__45652 = (i__45459_45647 + (1));
seq__45455_45644 = G__45649;
chunk__45457_45645 = G__45650;
count__45458_45646 = G__45651;
i__45459_45647 = G__45652;
continue;
} else {
var temp__5825__auto___45653 = cljs.core.seq(seq__45455_45644);
if(temp__5825__auto___45653){
var seq__45455_45654__$1 = temp__5825__auto___45653;
if(cljs.core.chunked_seq_QMARK_(seq__45455_45654__$1)){
var c__5525__auto___45655 = cljs.core.chunk_first(seq__45455_45654__$1);
var G__45656 = cljs.core.chunk_rest(seq__45455_45654__$1);
var G__45657 = c__5525__auto___45655;
var G__45658 = cljs.core.count(c__5525__auto___45655);
var G__45659 = (0);
seq__45455_45644 = G__45656;
chunk__45457_45645 = G__45657;
count__45458_45646 = G__45658;
i__45459_45647 = G__45659;
continue;
} else {
var f_45660 = cljs.core.first(seq__45455_45654__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_45660], 0));


var G__45661 = cljs.core.next(seq__45455_45654__$1);
var G__45662 = null;
var G__45663 = (0);
var G__45664 = (0);
seq__45455_45644 = G__45661;
chunk__45457_45645 = G__45662;
count__45458_45646 = G__45663;
i__45459_45647 = G__45664;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_45665 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__5002__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arglists_45665], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_45665)))?cljs.core.second(arglists_45665):arglists_45665)], 0));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Macro"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__45493_45666 = cljs.core.seq(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__45494_45667 = null;
var count__45495_45668 = (0);
var i__45496_45669 = (0);
while(true){
if((i__45496_45669 < count__45495_45668)){
var vec__45537_45670 = chunk__45494_45667.cljs$core$IIndexed$_nth$arity$2(null, i__45496_45669);
var name_45671 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45537_45670,(0),null);
var map__45540_45672 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45537_45670,(1),null);
var map__45540_45673__$1 = cljs.core.__destructure_map(map__45540_45672);
var doc_45674 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45540_45673__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_45675 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45540_45673__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_45671], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_45675], 0));

if(cljs.core.truth_(doc_45674)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_45674], 0));
} else {
}


var G__45676 = seq__45493_45666;
var G__45677 = chunk__45494_45667;
var G__45678 = count__45495_45668;
var G__45679 = (i__45496_45669 + (1));
seq__45493_45666 = G__45676;
chunk__45494_45667 = G__45677;
count__45495_45668 = G__45678;
i__45496_45669 = G__45679;
continue;
} else {
var temp__5825__auto___45680 = cljs.core.seq(seq__45493_45666);
if(temp__5825__auto___45680){
var seq__45493_45681__$1 = temp__5825__auto___45680;
if(cljs.core.chunked_seq_QMARK_(seq__45493_45681__$1)){
var c__5525__auto___45682 = cljs.core.chunk_first(seq__45493_45681__$1);
var G__45683 = cljs.core.chunk_rest(seq__45493_45681__$1);
var G__45684 = c__5525__auto___45682;
var G__45685 = cljs.core.count(c__5525__auto___45682);
var G__45686 = (0);
seq__45493_45666 = G__45683;
chunk__45494_45667 = G__45684;
count__45495_45668 = G__45685;
i__45496_45669 = G__45686;
continue;
} else {
var vec__45543_45687 = cljs.core.first(seq__45493_45681__$1);
var name_45688 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45543_45687,(0),null);
var map__45546_45689 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45543_45687,(1),null);
var map__45546_45690__$1 = cljs.core.__destructure_map(map__45546_45689);
var doc_45691 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45546_45690__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_45692 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45546_45690__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_45688], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_45692], 0));

if(cljs.core.truth_(doc_45691)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_45691], 0));
} else {
}


var G__45693 = cljs.core.next(seq__45493_45681__$1);
var G__45694 = null;
var G__45695 = (0);
var G__45696 = (0);
seq__45493_45666 = G__45693;
chunk__45494_45667 = G__45694;
count__45495_45668 = G__45695;
i__45496_45669 = G__45696;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5825__auto__ = cljs.spec.alpha.get_spec(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name(n)),cljs.core.name(nm)));
if(cljs.core.truth_(temp__5825__auto__)){
var fnspec = temp__5825__auto__;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));

var seq__45547 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__45548 = null;
var count__45549 = (0);
var i__45550 = (0);
while(true){
if((i__45550 < count__45549)){
var role = chunk__45548.cljs$core$IIndexed$_nth$arity$2(null, i__45550);
var temp__5825__auto___45697__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5825__auto___45697__$1)){
var spec_45698 = temp__5825__auto___45697__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_45698)], 0));
} else {
}


var G__45699 = seq__45547;
var G__45700 = chunk__45548;
var G__45701 = count__45549;
var G__45702 = (i__45550 + (1));
seq__45547 = G__45699;
chunk__45548 = G__45700;
count__45549 = G__45701;
i__45550 = G__45702;
continue;
} else {
var temp__5825__auto____$1 = cljs.core.seq(seq__45547);
if(temp__5825__auto____$1){
var seq__45547__$1 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__45547__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__45547__$1);
var G__45703 = cljs.core.chunk_rest(seq__45547__$1);
var G__45704 = c__5525__auto__;
var G__45705 = cljs.core.count(c__5525__auto__);
var G__45706 = (0);
seq__45547 = G__45703;
chunk__45548 = G__45704;
count__45549 = G__45705;
i__45550 = G__45706;
continue;
} else {
var role = cljs.core.first(seq__45547__$1);
var temp__5825__auto___45707__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5825__auto___45707__$2)){
var spec_45708 = temp__5825__auto___45707__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_45708)], 0));
} else {
}


var G__45709 = cljs.core.next(seq__45547__$1);
var G__45710 = null;
var G__45711 = (0);
var G__45712 = (0);
seq__45547 = G__45709;
chunk__45548 = G__45710;
count__45549 = G__45711;
i__45550 = G__45712;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Constructs a data representation for a Error with keys:
 *  :cause - root cause message
 *  :phase - error phase
 *  :via - cause chain, with cause keys:
 *           :type - exception class symbol
 *           :message - exception message
 *           :data - ex-data
 *           :at - top stack element
 *  :trace - root cause stack elements
 */
cljs.repl.Error__GT_map = (function cljs$repl$Error__GT_map(o){
return cljs.core.Throwable__GT_map(o);
});
/**
 * Returns an analysis of the phase, error, cause, and location of an error that occurred
 *   based on Throwable data, as returned by Throwable->map. All attributes other than phase
 *   are optional:
 *  :clojure.error/phase - keyword phase indicator, one of:
 *    :read-source :compile-syntax-check :compilation :macro-syntax-check :macroexpansion
 *    :execution :read-eval-result :print-eval-result
 *  :clojure.error/source - file name (no path)
 *  :clojure.error/line - integer line number
 *  :clojure.error/column - integer column number
 *  :clojure.error/symbol - symbol being expanded/compiled/invoked
 *  :clojure.error/class - cause exception class symbol
 *  :clojure.error/cause - cause exception message
 *  :clojure.error/spec - explain-data for spec error
 */
cljs.repl.ex_triage = (function cljs$repl$ex_triage(datafied_throwable){
var map__45557 = datafied_throwable;
var map__45557__$1 = cljs.core.__destructure_map(map__45557);
var via = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45557__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45557__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__45557__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__45558 = cljs.core.last(via);
var map__45558__$1 = cljs.core.__destructure_map(map__45558);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45558__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45558__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45558__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__45559 = data;
var map__45559__$1 = cljs.core.__destructure_map(map__45559);
var problems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45559__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45559__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45559__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__45560 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first(via));
var map__45560__$1 = cljs.core.__destructure_map(map__45560);
var top_data = map__45560__$1;
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45560__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__45562 = phase;
var G__45562__$1 = (((G__45562 instanceof cljs.core.Keyword))?G__45562.fqn:null);
switch (G__45562__$1) {
case "read-source":
var map__45563 = data;
var map__45563__$1 = cljs.core.__destructure_map(map__45563);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45563__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45563__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__45565 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second(via)),top_data], 0));
var G__45565__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45565,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__45565);
var G__45565__$2 = (cljs.core.truth_((function (){var fexpr__45566 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__45566.cljs$core$IFn$_invoke$arity$1 ? fexpr__45566.cljs$core$IFn$_invoke$arity$1(source) : fexpr__45566.call(null, source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__45565__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__45565__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45565__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__45565__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__45567 = top_data;
var G__45567__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45567,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__45567);
var G__45567__$2 = (cljs.core.truth_((function (){var fexpr__45572 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__45572.cljs$core$IFn$_invoke$arity$1 ? fexpr__45572.cljs$core$IFn$_invoke$arity$1(source) : fexpr__45572.call(null, source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__45567__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__45567__$1);
var G__45567__$3 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45567__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__45567__$2);
var G__45567__$4 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45567__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__45567__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45567__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__45567__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__45574 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45574,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45574,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45574,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45574,(3),null);
var G__45577 = top_data;
var G__45577__$1 = (cljs.core.truth_(line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45577,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__45577);
var G__45577__$2 = (cljs.core.truth_(file)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45577__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__45577__$1);
var G__45577__$3 = (cljs.core.truth_((function (){var and__5000__auto__ = source__$1;
if(cljs.core.truth_(and__5000__auto__)){
return method;
} else {
return and__5000__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45577__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__45577__$2);
var G__45577__$4 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45577__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__45577__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45577__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__45577__$4;
}

break;
case "execution":
var vec__45579 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45579,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45579,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45579,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45579,(3),null);
var file__$1 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__45555_SHARP_){
var or__5002__auto__ = (p1__45555_SHARP_ == null);
if(or__5002__auto__){
return or__5002__auto__;
} else {
var fexpr__45582 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__45582.cljs$core$IFn$_invoke$arity$1 ? fexpr__45582.cljs$core$IFn$_invoke$arity$1(p1__45555_SHARP_) : fexpr__45582.call(null, p1__45555_SHARP_));
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__5002__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return line;
}
})();
var G__45587 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__45587__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45587,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__45587);
var G__45587__$2 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45587__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__45587__$1);
var G__45587__$3 = (cljs.core.truth_((function (){var or__5002__auto__ = fn;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var and__5000__auto__ = source__$1;
if(cljs.core.truth_(and__5000__auto__)){
return method;
} else {
return and__5000__auto__;
}
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45587__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__5002__auto__ = fn;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__45587__$2);
var G__45587__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45587__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__45587__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45587__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__45587__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__45562__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__45593){
var map__45594 = p__45593;
var map__45594__$1 = cljs.core.__destructure_map(map__45594);
var triage_data = map__45594__$1;
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45594__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45594__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45594__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45594__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45594__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45594__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45594__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45594__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5002__auto__ = source;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5002__auto__ = line;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name((function (){var or__5002__auto__ = class$;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__45596 = phase;
var G__45596__$1 = (((G__45596 instanceof cljs.core.Keyword))?G__45596.fqn:null);
switch (G__45596__$1) {
case "read-source":
return (format.cljs$core$IFn$_invoke$arity$3 ? format.cljs$core$IFn$_invoke$arity$3("Syntax error reading source at (%s).\n%s\n",loc,cause) : format.call(null, "Syntax error reading source at (%s).\n%s\n",loc,cause));

break;
case "macro-syntax-check":
var G__45597 = "Syntax error macroexpanding %sat (%s).\n%s";
var G__45598 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__45599 = loc;
var G__45600 = (cljs.core.truth_(spec)?(function (){var sb__5647__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__45602_45732 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__45603_45733 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__45604_45734 = true;
var _STAR_print_fn_STAR__temp_val__45605_45735 = (function (x__5648__auto__){
return sb__5647__auto__.append(x__5648__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__45604_45734);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__45605_45735);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__45590_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__45590_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__45603_45733);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__45602_45732);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5647__auto__);
})():(format.cljs$core$IFn$_invoke$arity$2 ? format.cljs$core$IFn$_invoke$arity$2("%s\n",cause) : format.call(null, "%s\n",cause)));
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__45597,G__45598,G__45599,G__45600) : format.call(null, G__45597,G__45598,G__45599,G__45600));

break;
case "macroexpansion":
var G__45610 = "Unexpected error%s macroexpanding %sat (%s).\n%s\n";
var G__45611 = cause_type;
var G__45612 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__45613 = loc;
var G__45614 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__45610,G__45611,G__45612,G__45613,G__45614) : format.call(null, G__45610,G__45611,G__45612,G__45613,G__45614));

break;
case "compile-syntax-check":
var G__45615 = "Syntax error%s compiling %sat (%s).\n%s\n";
var G__45616 = cause_type;
var G__45617 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__45618 = loc;
var G__45619 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__45615,G__45616,G__45617,G__45618,G__45619) : format.call(null, G__45615,G__45616,G__45617,G__45618,G__45619));

break;
case "compilation":
var G__45620 = "Unexpected error%s compiling %sat (%s).\n%s\n";
var G__45621 = cause_type;
var G__45622 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__45623 = loc;
var G__45624 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__45620,G__45621,G__45622,G__45623,G__45624) : format.call(null, G__45620,G__45621,G__45622,G__45623,G__45624));

break;
case "read-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null, "Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "print-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null, "Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "execution":
if(cljs.core.truth_(spec)){
var G__45625 = "Execution error - invalid arguments to %s at (%s).\n%s";
var G__45626 = symbol;
var G__45627 = loc;
var G__45628 = (function (){var sb__5647__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__45629_45736 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__45630_45737 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__45631_45738 = true;
var _STAR_print_fn_STAR__temp_val__45632_45739 = (function (x__5648__auto__){
return sb__5647__auto__.append(x__5648__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__45631_45738);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__45632_45739);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__45592_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__45592_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__45630_45737);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__45629_45736);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5647__auto__);
})();
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__45625,G__45626,G__45627,G__45628) : format.call(null, G__45625,G__45626,G__45627,G__45628));
} else {
var G__45633 = "Execution error%s at %s(%s).\n%s\n";
var G__45634 = cause_type;
var G__45635 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__45636 = loc;
var G__45637 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__45633,G__45634,G__45635,G__45636,G__45637) : format.call(null, G__45633,G__45634,G__45635,G__45636,G__45637));
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__45596__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str(cljs.repl.ex_triage(cljs.repl.Error__GT_map(error)));
});

//# sourceMappingURL=cljs.repl.js.map
