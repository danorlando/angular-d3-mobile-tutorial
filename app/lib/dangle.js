
/*! dangle - v1.0.0 - 2013-03-01
 * http://www.fullscale.co/dangle
 * Copyright (c) 2013 FullScale Labs, LLC; Licensed MIT */
angular.module("dangle", []), angular.module("dangle").directive("fsArea", [
    function () {
        "use strict";
        return {
            restrict: "E",
            scope: {
                onClick: "=",
                width: "=",
                height: "=",
                bind: "=",
                label: "@",
                field: "@",
                duration: "@",
                delay: "@",
                plot: "@",
                pointRadius: "@"
            },
            link: function (e, t, n) {
                var r = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 80
                }, i = e.width || 1280,
                    s = e.height || 300,
                    o = n.interpolate || "false",
                    u = n.label || "Frequency",
                    a = n.class || "";
                i = i - r.left - r.right, s = s - r.top - r.bottom;
                var f = d3.time.scale().range([0, i]),
                    l = d3.scale.linear().range([s, 0]),
                    c = d3.svg.axis().scale(f).orient("bottom"),
                    h = d3.svg.axis().scale(l).orient("left"),
                    p = d3.svg.line().x(function (e) {
                        return f(e.time)
                    }).y(function (e) {
                        return l(e.count)
                    }),
                    d = d3.svg.area().x(function (e) {
                        return f(e.time)
                    }).y0(s).y1(function (e) {
                        return l(e.count)
                    });
                n.interpolate == "true" && (p.interpolate("cardinal"), d.interpolate("cardinal"));
                var v = d3.select(t[0]).append("svg").attr("preserveAspectRatio", "xMinYMin").attr("viewBox", "0 0 " + (i + r.left + r.right) + " " + (s + r.top + r.bottom)).append("g").attr("transform", "translate(" + r.left + "," + r.top + ")");
                v.append("path").datum([]).attr("class", "area fill " + a).attr("d", d), v.append("g").attr("class", "area x axis " + a).attr("transform", "translate(0," + s + ")").call(c), v.append("g").attr("class", "area y axis " + a).call(h).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(u), v.append("path").datum([]).attr("class", "area line " + a).attr("d", p), e.$watch("bind", function (t) {
                    var r = e.duration || 0,
                        i = e.delay || 0,
                        s = e.plot || "true",
                        o = e.pointRadius || 8,
                        u = e.field || n.bind.split(".").pop().toLowerCase();
                    if (t) {
                        t = t.entries || [], f.domain(d3.extent(t, function (e) {
                            return e.time
                        })), l.domain([0, d3.max(t, function (e) {
                            return e.count
                        })]);
                        var m = v.transition().duration(r);
                        m.select(".area").attr("d", d(t)), m.select(".line").attr("d", p(t));
                        if (s == "true") {
                            var g = v.selectAll("circle").data(t.filter(function (e) {
                                return e.count
                            }), function (e) {
                                return Math.random()
                            });
                            g.enter().append("circle").attr("class", "area line points " + a).attr("cursor", "pointer").attr("cx", p.x()).attr("cy", p.y()).style("opacity", 0).transition().duration(r).style("opacity", 1).attr("cx", p.x()).attr("cy", p.y()).attr("r", o), g.on("mousedown", function (t) {
                                e.$apply(function () {
                                    (e.onClick || angular.noop)(u, t.time)
                                })
                            }), g.exit().remove()
                        }
                        m.select(".x").call(c), m.select(".y").call(h)
                    }
                })
            }
        }
    }
]), angular.module("dangle").directive("fsBar", [
    function () {
        "user strict";
        return {
            restrict: "E",
            scope: {
                onClick: "=",
                width: "=",
                height: "=",
                bind: "=",
                duration: "@"
            },
            link: function (e, t, n) {
                var r = {
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 10
                }, i = e.width || 300,
                    s = e.height || 1020;
                i = i - r.left - r.right, s = s - r.top - r.bottom;
                var o = n.class || "",
                    u = n.align || "left",
                    a = u === "right" ? "xMaxYMin" : "xMinYMin",
                    f = d3.scale.linear().range([0, i]),
                    l = d3.scale.ordinal().rangeBands([0, s], .1),
                    c = d3.select(t[0]).append("svg").attr("preserveAspectRatio", a + " meet").attr("viewBox", "0 0 " + (i + r.left + r.right) + " " + (s + r.top + r.bottom)).append("g").attr("transform", "translate(" + r.left + "," + r.top + ")");
                e.$watch("bind", function (t) {
                    var r = e.duration || 0,
                        s = e.delay || 0,
                        a = e.field || n.bind.split(".").pop().toLowerCase();
                    if (t) {
                        t = t.terms || [], f.domain([0, d3.max(t, function (e) {
                            return e.count
                        }) * 2]), l.domain(t.map(function (e) {
                            return e.term
                        }));
                        var h = c.selectAll("rect").data(t, function (e) {
                            return Math.random()
                        });
                        h.enter().append("rect").attr("class", "bar rect " + o).attr("cursor", "pointer").attr("y", function (e) {
                            return l(e.term)
                        }).attr("height", l.rangeBand()).attr("x", function (e) {
                            return u === "right" ? i : 0
                        }).transition().duration(r).attr("width", function (e) {
                            return f(e.count)
                        }).attr("x", function (e) {
                            return u === "right" ? i - f(e.count) : 0
                        }), h.on("mousedown", function (t) {
                            e.$apply(function () {
                                (e.onClick || angular.noop)(a, t.term)
                            })
                        }), h.exit().remove();
                        var p = c.selectAll("text").data(t, function (e) {
                            return Math.random()
                        });
                        p.enter().append("text").attr("class", "bar text " + o).attr("cursor", "pointer").attr("y", function (e) {
                            return l(e.term) + l.rangeBand() / 2
                        }).attr("x", function (e) {
                            return u === "right" ? i - f(e.count) - 3 : f(e.count) + 3
                        }).attr("dy", ".35em").attr("text-anchor", function (e) {
                            return u === "right" ? "end" : "start"
                        }).text(function (e) {
                            return u === "right" ? "(" + e.count + ") " + e.term : e.term + " (" + e.count + ")"
                        }), p.on("mousedown", function (t) {
                            e.$apply(function () {
                                (e.onClick || angular.noop)(a, t.term)
                            })
                        }), p.exit().remove()
                    }
                })
            }
        }
    }
]), angular.module("dangle").directive("fsColumn", [
    function () {
        "use strict";
        return {
            restrict: "E",
            scope: {
                fontSize: "=",
                onClick: "=",
                width: "=",
                height: "=",
                bind: "="
            },
            link: function (e, t, n) {
                var r = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40
                }, i = e.width || 960,
                    s = e.height || 500,
                    o = n.color || "steelblue",
                    u = n.fontColor || "#000",
                    a = e.fontSize || 14,
                    f = n.label || "Frequency";
                n.field == undefined && (n.field = n.bind.split(".").pop().toLowerCase()), i = i - r.left - r.right, s = s - r.top - r.bottom;
                var l = d3.scale.ordinal().rangeRoundBands([0, i], .1),
                    c = d3.scale.linear().range([s, 0]),
                    h = d3.svg.axis().scale(l).orient("bottom"),
                    p = d3.svg.axis().scale(c).orient("left"),
                    d = d3.select(t[0]).append("svg").attr("preserveAspectRatio", "xMinYMin meet").attr("viewBox", "0 0 " + (i + r.left + r.right) + " " + (s + r.top + r.bottom)).append("g").attr("transform", "translate(" + r.left + "," + r.top + ")");
                e.$watch("bind", function (t) {
                    t && (t = t.terms || [], d.selectAll("*").remove(), l.domain(t.map(function (e) {
                        return e.term
                    })), c.domain([0, d3.max(t, function (e) {
                        return e.count
                    })]), d.append("g").attr("fill", u).attr("font-size", a).attr("class", "x axis").attr("transform", "translate(0," + s + ")").call(h), d.append("g").attr("class", "y axis").attr("font-size", a).attr("fill", u).call(p).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".51em").style("text-anchor", "end").text(f), d.selectAll(".bar").data(t).enter().append("rect").attr("fill", o).attr("x", function (e) {
                        return l(e.term)
                    }).attr("width", l.rangeBand()).attr("y", function (e) {
                        return c(e.count)
                    }).attr("height", function (e) {
                        return s - c(e.count)
                    }).on("mousedown", function (t) {
                        e.$apply(function () {
                            (e.onClick || angular.noop)(n.field, t.term)
                        })
                    }))
                })
            }
        }
    }
]), angular.module("dangle").directive("fsDateHisto", [
    function () {
        "use strict";
        return {
            restrict: "E",
            scope: {
                onClick: "=",
                width: "=",
                height: "=",
                bind: "=",
                label: "@",
                field: "@",
                duration: "@",
                delay: "@",
                interval: "@"
            },
            link: function (e, t, n) {
                var r = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 80
                }, i = e.width || 1280,
                    s = e.height || 300,
                    o = n.label || "Frequency",
                    u = n.class || "";
                i = i - r.left - r.right, s = s - r.top - r.bottom;
                var a = d3.time.scale().range([0, i]),
                    f = d3.scale.linear().range([s, 0]),
                    l = d3.svg.axis().scale(a).orient("bottom"),
                    c = d3.svg.axis().scale(f).orient("left"),
                    h = d3.select(t[0]).append("svg").attr("preserveAspectRatio", "xMinYMin").attr("viewBox", "0 0 " + (i + r.left + r.right) + " " + (s + r.top + r.bottom)).append("g").attr("transform", "translate(" + r.left + "," + r.top + ")");
                h.append("g").attr("class", "histo x axis " + u).attr("transform", "translate(0," + s + ")").call(l), h.append("g").attr("class", "histo y axis " + u).call(c).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".51em").style("text-anchor", "end").text(o), e.$watch("bind", function (t) {
                    var r = e.duration || 0,
                        o = e.delay || 0,
                        p = e.field || n.bind.split(".").pop().toLowerCase(),
                        d = e.interval || "day";
                    if (t) {
                        t = t.entries || [];
                        var v = i / t.length - 2,
                            m = 864e5;
                        switch (d.toLowerCase()) {
                        case "minute":
                            m = 6e4;
                            break;
                        case "hour":
                            m = 36e5;
                            break;
                        case "day":
                            m = 864e5;
                            break;
                        case "week":
                            m = 6048e5;
                            break;
                        case "month":
                            m = 263e7;
                            break;
                        case "year":
                            m = 3156e7
                        }
                        a.domain([d3.min(t, function (e) {
                            return e.time
                        }), d3.max(t, function (e) {
                            return e.time
                        }) + m]), f.domain([0, d3.max(t, function (e) {
                            return e.count
                        })]);
                        var g = h.transition().duration(r),
                            b = h.selectAll("rect").data(t, function (e) {
                                return Math.random()
                            });
                        b.enter().append("rect").attr("class", "histo rect " + u).attr("cursor", "pointer").attr("x", function (e) {
                            return a(e.time)
                        }).attr("y", function (e) {
                            return s
                        }).attr("width", v).transition().delay(function (e, t) {
                            return t * o
                        }).duration(r).attr("height", function (e) {
                            return s - f(e.count)
                        }).attr("y", function (e) {
                            return f(e.count)
                        }), b.on("mousedown", function (t) {
                            e.$apply(function () {
                                (e.onClick || angular.noop)(p, t.time)
                            })
                        }), b.exit().remove(), g.select(".x").call(l), g.select(".y").call(c)
                    }
                })
            }
        }
    }
]), angular.module("dangle").directive("fsDonut", [
    function () {
        "use strict";
        return {
            restrict: "E",
            scope: {
                outerRadius: "=",
                innerRadius: "=",
                fontSize: "=",
                domain: "=",
                colorMap: "=",
                onClick: "=",
                bind: "=",
                duration: "@"
            },
            link: function (e, t, n) {
                var r = e.outerRadius || 200,
                    i = e.innerRadius || 0,
                    s = e.fontSize || 14,
                    o = n.fontColor || "#fff",
                    u = undefined;
                n.field == undefined && (n.field = n.bind.split(".").pop().toLowerCase()), e.colorMap === undefined ? (u = d3.scale.category20c(), e.domain !== undefined && u.domain(e.domain)) : u = function (t) {
                    return e.colorMap[t]
                };
                var a = r * 3 + 30,
                    f = r * 3,
                    l = d3.svg.arc().outerRadius(r - 10).innerRadius(i),
                    c = d3.layout.pie().sort(null).value(function (e) {
                        return e.count
                    }),
                    h = d3.select(t[0]).append("svg").attr("preserveAspectRatio", "xMinYMin meet").attr("viewBox", "0 0 " + a + " " + f),
                    p = h.append("g").attr("transform", "translate(" + a / 2 + "," + f / 2 + ") rotate(180) scale(-1, -1)"),
                    d = h.append("g").attr("class", "label_group").attr("transform", "translate(" + a / 2 + "," + f / 2 + ")");
                e.$watch("bind", function (t) {
                    function s(e, t) {
                        var t = d3.interpolate(this._current, e);
                        return this._current = t(0),
                        function (e) {
                            return l(t(e))
                        }
                    }

                    function o(e, t) {
                        var n = (this._current.startAngle + this._current.endAngle - Math.PI) / 2,
                            i = (e.startAngle + e.endAngle - Math.PI) / 2,
                            s = d3.interpolateNumber(n, i);
                        return function (e) {
                            var t = s(e);
                            return "translate(" + Math.cos(t) * (r + f) + "," + Math.sin(t) * (r + f) + ")"
                        }
                    }
                    var i = e.duration || 0,
                        a = function (e) {
                            return (e.startAngle + e.endAngle) / 2 < Math.PI ? "beginning" : "end"
                        }, f = 14;
                    if (t) {
                        t = t.terms || [];
                        var v = c(t),
                            m = 0;
                        for (var g = 0; g < t.length; g++) m += t[g].count;
                        if (m > 0) {
                            var y = p.selectAll("path").data(v);
                            y.enter().append("path").attr("d", l).attr("stroke", "#fff").attr("stroke-width", "1.5").attr("cursor", "pointer").style("fill", function (e) {
                                return u(e.data.term)
                            }).each(function (e) {
                                this._current = e
                            }).on("mousedown", function (t) {
                                e.$apply(function () {
                                    (e.onClick || angular.noop)(n.field, t.data.term)
                                })
                            }), y.transition().duration(i).attrTween("d", s);
                            var b = d.selectAll("line").data(v);
                            b.enter().append("line").attr("x1", 0).attr("x2", 0).attr("y1", -r - 3).attr("y2", -r - 8).attr("stroke", "grey").attr("stroke-width", 2).attr("transform", function (e) {
                                return "rotate(" + (e.startAngle + e.endAngle) / 2 * (180 / Math.PI) + ")"
                            }).each(function (e) {
                                this._current = e
                            }), b.transition().duration(750).attr("transform", function (e) {
                                return "rotate(" + (e.startAngle + e.endAngle) / 2 * (180 / Math.PI) + ")"
                            }), b.exit().remove();
                            var w = d.selectAll("text.value").data(v).attr("dy", function (e) {
                                return (e.startAngle + e.endAngle) / 2 > Math.PI / 2 && (e.startAngle + e.endAngle) / 2 < Math.PI * 1.5 ? 17 : -17
                            }).attr("text-anchor", a).text(function (e) {
                                var t = e.value / m * 100;
                                return t.toFixed(1) + "%"
                            });
                            w.enter().append("text").attr("class", "value").attr("font-size", 20).attr("font-weight", "bold").attr("transform", function (e) {
                                return "translate(" + Math.cos((e.startAngle + e.endAngle - Math.PI) / 2) * (r + f) + "," + Math.sin((e.startAngle + e.endAngle - Math.PI) / 2) * (r + f) + ")"
                            }).attr("dy", function (e) {
                                return (e.startAngle + e.endAngle) / 2 > Math.PI / 2 && (e.startAngle + e.endAngle) / 2 < Math.PI * 1.5 ? 17 : -17
                            }).attr("text-anchor", a).text(function (e) {
                                var t = e.value / m * 100;
                                return t.toFixed(1) + "%"
                            }).each(function (e) {
                                this._current = e
                            }), w.transition().duration(i).attrTween("transform", o), w.exit().remove();
                            var E = d.selectAll("text.units").data(v).attr("dy", function (e) {
                                return (e.startAngle + e.endAngle) / 2 > Math.PI / 2 && (e.startAngle + e.endAngle) / 2 < Math.PI * 1.5 ? 36 : 2
                            }).attr("text-anchor", function (e) {
                                return (e.startAngle + e.endAngle) / 2 < Math.PI ? "beginning" : "end"
                            }).text(function (e) {
                                return e.data.term === "T" ? "TRUE (" + e.value + ")" : e.data.term === "F" ? "FALSE (" + e.value + ")" : e.data.term + " (" + e.value + ")"
                            });
                            E.enter().append("text").attr("class", "units").attr("font-size", 16).attr("stroke", "none").attr("fill", "#000").attr("transform", function (e) {
                                return "translate(" + Math.cos((e.startAngle + e.endAngle - Math.PI) / 2) * (r + f) + "," + Math.sin((e.startAngle + e.endAngle - Math.PI) / 2) * (r + f) + ")"
                            }).attr("dy", function (e) {
                                return (e.startAngle + e.endAngle) / 2 > Math.PI / 2 && (e.startAngle + e.endAngle) / 2 < Math.PI * 1.5 ? 36 : 2
                            }).attr("text-anchor", a).text(function (e) {
                                return e.data.term === "T" ? "TRUE (" + e.value + ")" : e.data.term === "F" ? "FALSE (" + e.value + ")" : e.data.term + " (" + e.value + ")"
                            }).each(function (e) {
                                this._current = e
                            }), E.transition().duration(i).attrTween("transform", o), E.exit().remove()
                        } else h.selectAll("path").remove(), d.selectAll("line").remove(), d.selectAll("text.value").remove(), d.selectAll("text.units").remove()
                    }
                })
            }
        }
    }
]), angular.module("dangle").directive("fsPie", [
    function () {
        "use strict";
        return {
            restrict: "E",
            scope: {
                outerRadius: "=",
                innerRadius: "=",
                fontSize: "=",
                domain: "=",
                colorMap: "=",
                onClick: "=",
                bind: "="
            },
            link: function (e, t, n) {
                var r = e.outerRadius || 200,
                    i = e.innerRadius || 0,
                    s = e.fontSize || 14,
                    o = n.fontColor || "#fff",
                    u = undefined;
                n.field == undefined && (n.field = n.bind.split(".").pop().toLowerCase()), e.colorMap == undefined ? (u = d3.scale.category20c(), e.domain !== undefined && u.domain(e.domain)) : u = function (t) {
                    return e.colorMap[t]
                };
                var a = d3.svg.arc().outerRadius(r - 10).innerRadius(i),
                    f = d3.layout.pie().sort(null).value(function (e) {
                        return e.count
                    }),
                    l = d3.select(t[0]).append("svg").attr("preserveAspectRatio", "xMinYMin meet").attr("viewBox", "0 0 " + r * 2 + " " + r * 2).append("g").attr("transform", "translate(" + r + "," + r + ") rotate(180) scale(-1, -1)");
                e.$watch("bind", function (t) {
                    if (t) {
                        t = t.terms || [], l.selectAll("*").remove();
                        var r = l.selectAll(".arc").data(f(t)).enter().append("g").attr("class", "arc").on("mousedown", function (t) {
                            e.$apply(function () {
                                (e.onClick || angular.noop)(n.field, t.data.term)
                            })
                        });
                        r.append("path").attr("d", a).style("fill", function (e) {
                            return u(e.data.term)
                        }), r.append("text").attr("transform", function (e) {
                            return "translate(" + a.centroid(e) + ")"
                        }).attr("dy", ".55em").style("text-anchor", "middle").attr("fill", o).attr("font-size", s).text(function (e) {
                            return e.data.term
                        })
                    }
                })
            }
        }
    }
]);