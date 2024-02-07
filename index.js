function getstr(str) {
  var arr = str.toString().split(" ");
  var max = 53;
  var count = 0;
  var check = 1;
  var i;
  var ans = "";
  for (i = 0; i < arr.length; i++) {
    if (arr[i].length + count <= max) {
      ans = ans + arr[i] + " ";
      count = count + arr[i].length + 1;
    } else {
      ans = ans + "\n  " + arr[i] + " ";
      count = arr[i].length;
      check = check + 1;
    }
  }
  if (ans == "") check = 0;
  return [ans, check];
}

function sentenceCase(str) {
  return str.toUpperCase();
}

function get() {
  var i;
  var doc = new jsPDF("p", "mm", "a3", true);
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 500, 500, "F");
  doc.addImage(bvrithLogo(), "JPEG", 174, 7, 115, 40, "", "FAST");

  doc.setFillColor(10, 157, 53);
  doc.rect(10, 19, 165, 13, "F");
  //   doc.setFillColor(255, 115, 0);
  //   doc.rect(0, 400, 350, 13, "F");

  //   doc.setFontSize(22);
  //   doc.setFont("times");
  //   doc.setFontType("bold");

  doc.text(
    15,
    28,
    sentenceCase(
      document.getElementsByName("firstname")[0].value
    ).toUpperCase() +
      "'S" +
      "  PROFILE"
  );
  var photo = document.getElementById("photo").getAttribute("src");
  doc.addImage(photo, "JPEG", 204, 57, 65, 80, "", "FAST");
  doc.setFontType("italic");

  /*personal*/
  doc.setFontType("times");
  doc.setFont("times");
  doc.setFontSize(18);
  doc.setTextColor(244, 107, 16);
  doc.text(15, 53, "Details : ");

  const arr = document.getElementsByName("name[]");
  const a = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value == "") break;
    else a.push(arr[i].value);
  }
  const tableData = [
    [
      "Name :",
      document.getElementsByName("firstname")[0].value +
        " " +
        document.getElementsByName("lastname")[0].value,
    ],
    ["Designation :", document.getElementById("designation").value],
    ["Department :", document.getElementById("department").value],
    [
      "Years of Experience :",
      "Teaching : " +
        document.getElementsByName("yearsTeaching")[0].value +
        "\n" +
        "Research : " +
        document.getElementsByName("yearsResearch")[0].value,
    ],
    ["Email Id :", document.getElementById("email").value],
    ["Phone Number :", document.getElementById("phonenumber").value],
    ["Areas of Specialization :", a.join(", ")],
  ];

  doc.autoTable({
    startY: 57,
    startX: 20,
    body: tableData,
    theme: "plain",
    styles: {
      fontStyle: "times",
      fontSize: 14,
    },
    margin: {
      left: 20,
    },
    columnStyles: {
      0: { cellWidth: 70, fontStyle: "bold" },
      1: { cellWidth: 110 },
    },
  });
  var finalY = doc.lastAutoTable.finalY + 10;
  var pos = finalY;
  var joinDate = document.getElementById("joinDate").value;
  doc.setTextColor(244, 107, 16);
  doc.text(15, pos, "Date Of Joining :  ");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.text(60, pos, joinDate);

  doc.setFontType("times");
  pos += 10;
  doc.setTextColor(244, 107, 16);
  doc.setFontSize(18);
  doc.text(15, pos, "Educational Qualification : ");
  pos += 5;

  var qual = document.getElementsByName("QUALIFICATION[]");
  var deg = document.getElementsByName("degree[]");
  var uni = document.getElementsByName("university[]");
  var degree = [];
  var qualification = [];
  var university = [];

  for (var i = 0; i < qual.length; i++) {
    degree.push(deg[i].value);
    qualification.push(qual[i].value);
    university.push(uni[i].value);
  }

  var QualtableData = [];
  QualtableData.push(["Qualification", "Degree Name", "University"]);
  for (var i = 0; i < qual.length; i++) {
    QualtableData.push([qualification[i], degree[i], university[i]]);
  }
  //   doc.setDrawColor(255, 0, 0);
  //   doc.setLineWidth(3);
  doc.autoTable({
    startY: pos,
    startX: 20,
    body: QualtableData,
    theme: "grid",
    styles: {
      fontStyle: "bold",
      lineColor: [0, 0, 0],
      lineWidth: 0.75,
      fontSize: 14,
    },
    bodyStyles: { fontWeight: "bold" },
    margin: {
      left: 20,
      right: 120,
    },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: "times" },
      1: { cellWidth: 50, fontStyle: "times" },
      2: { cellWidth: 100, fontStyle: "times" },
    },

    // tableLineColor: [0, 0, 0],
    // tableLineWidth: 0.75,
  });

  // patent field ----------------------------------------------------------
  var finalY = doc.lastAutoTable.finalY + 10;
  var pos = finalY;
  var ans = "";
  doc.text(15, pos, "Patent Filed : ");
  var patents = document.getElementsByName("patent[]");
  for (i = 0; i < patents.length; i++) {
    if (i != patents.length - 1) {
      ans = ans + (i + 1) + ")  " + patents[i].value + "\n" + "\n";
    } else {
      ans = ans + (i + 1) + ")  " + patents[i].value;
    }
  }
  doc.autoTable([[""]], [[ans]], {
    bodyStyles: {
      valign: "top",
    },
    styles: {
      overflow: "linebreak",
      overflowColumns: false,
      align: "justify",
    },
    columnWidth: "wrap",
    columnStyles: {
      0: {
        cellWidth: 250,
        font: "times",
        fontSize: 14,
        textColor: [0, 0, 0],
      },
    },
    margin: {
      left: 20,
    },

    startY: pos + 2,
    theme: "plain",
  });
  // books published ----------------------------------------------------------
  var finalY = doc.lastAutoTable.finalY + 10;
  var pos = finalY;
  doc.text(15, pos, "Books Publishes/ Book Chapters/ Monographs : ");
  var ans = "";
  var b = document.getElementsByName("books[]");
  for (i = 0; i < b.length; i++) {
    if (i != b.length - 1) {
      ans = ans + (i + 1) + ")  " + b[i].value + "\n" + "\n";
    } else {
      ans = ans + (i + 1) + ")  " + b[i].value;
    }
  }
  doc.autoTable([[""]], [[ans]], {
    bodyStyles: {
      valign: "top",
    },
    styles: {
      overflow: "linebreak",
      overflowColumns: false,
      align: "justify",
    },
    columnWidth: "wrap",
    columnStyles: {
      0: {
        cellWidth: 250,
        font: "times",
        fontSize: 14,
        textColor: [0, 0, 0],
      },
    },
    margin: {
      left: 20,
    },

    startY: pos + 2,
    theme: "plain",
  });
  // Papers published ----------------------------------------------------------
  var finalY = doc.lastAutoTable.finalY + 10;
  var pos = finalY;
  doc.setFontSize(18);
  doc.text(15, pos, "Papers Published : ");
  var pos = finalY + 7;
  doc.setFontSize(16);
  doc.setTextColor(172, 2, 172);
  pos += 2;
  doc.text(25, pos, "International Journal Publications : ");

  var ans = "";
  var b = document.getElementsByName("journal[]");
  for (i = 0; i < b.length; i++) {
    if (i != b.length - 1) {
      ans = ans + (i + 1) + ")  " + b[i].value + "\n" + "\n";
    } else {
      ans = ans + (i + 1) + ")  " + b[i].value;
    }
  }
  doc.autoTable([[""]], [[ans]], {
    bodyStyles: {
      valign: "top",
    },
    styles: {
      overflow: "linebreak",
      overflowColumns: false,
      align: "justify",
    },
    columnWidth: "wrap",
    columnStyles: {
      0: {
        cellWidth: 250,
        font: "times",
        fontSize: 14,
        textColor: [0, 0, 0],
      },
    },
    margin: {
      left: 30,
    },

    startY: pos + 2,
    theme: "plain",
  });
  // international conference ----------------------------------------------------------
  var finalY = doc.lastAutoTable.finalY + 10;
  var pos = finalY;
  doc.setFontSize(16);
  doc.text(25, pos, "International Conference Publications : ");
  var ans = "";
  var b = document.getElementsByName("Iconference[]");
  for (i = 0; i < b.length; i++) {
    if (i != b.length - 1) {
      ans = ans + (i + 1) + ")  " + b[i].value + "\n" + "\n";
    } else {
      ans = ans + (i + 1) + ")  " + b[i].value;
    }
  }
  doc.autoTable([[""]], [[ans]], {
    bodyStyles: {
      valign: "top",
    },
    styles: {
      overflow: "linebreak",
      overflowColumns: false,
      align: "justify",
    },
    columnWidth: "wrap",
    columnStyles: {
      0: {
        cellWidth: 250,
        font: "times",
        fontSize: 14,
        textColor: [0, 0, 0],
      },
    },
    margin: {
      left: 30,
    },

    startY: pos + 2,
    theme: "plain",
  });
  // national conference ----------------------------------------------------------
  var finalY = doc.lastAutoTable.finalY + 10;
  var pos = finalY;
  doc.setFontSize(16);
  doc.text(25, pos, "National Conference Publications : ");
  var ans = "";
  var b = document.getElementsByName("Nconference[]");
  for (i = 0; i < b.length; i++) {
    if (i != b.length - 1) {
      ans = ans + (i + 1) + ")  " + b[i].value + "\n" + "\n";
    } else {
      ans = ans + (i + 1) + ")  " + b[i].value;
    }
  }
  doc.autoTable([[""]], [[ans]], {
    bodyStyles: {
      valign: "top",
    },
    styles: {
      overflow: "linebreak",
      overflowColumns: false,
      align: "justify",
    },
    columnWidth: "wrap",
    columnStyles: {
      0: {
        cellWidth: 250,
        font: "times",
        fontSize: 14,
        textColor: [0, 0, 0],
      },
    },
    margin: {
      left: 30,
    },

    startY: pos + 2,
    theme: "plain",
  });
  // FDP ------------------------------------------------------------------
  var finalY = doc.lastAutoTable.finalY + 10;
  var pos = finalY;
  doc.setFontSize(18);
  doc.setTextColor(244, 107, 16);
  doc.text(15, pos, "FDP's Attended / Conducted : ");
  var ans = "";
  var b = document.getElementsByName("fdp[]");
  for (i = 0; i < b.length; i++) {
    if (i != b.length - 1) {
      ans = ans + (i + 1) + ")  " + b[i].value + "\n" + "\n";
    } else {
      ans = ans + (i + 1) + ")  " + b[i].value;
    }
  }
  doc.autoTable([[""]], [[ans]], {
    bodyStyles: {
      valign: "top",
    },
    styles: {
      overflow: "linebreak",
      overflowColumns: false,
      align: "justify",
    },
    columnWidth: "wrap",
    columnStyles: {
      0: {
        cellWidth: 250,
        font: "times",
        fontSize: 14,
        textColor: [0, 0, 0],
      },
    },
    margin: {
      left: 20,
    },

    startY: pos + 2,
    theme: "plain",
  });
  // Webinars ------------------------------------------------------------------
  var finalY = doc.lastAutoTable.finalY + 10;
  var pos = finalY;
  doc.setFontSize(18);
  doc.setTextColor(244, 107, 16);
  doc.text(15, pos, "Webinars : ");
  var ans = "";
  var b = document.getElementsByName("webinar[]");
  for (i = 0; i < b.length; i++) {
    if (i != b.length - 1) {
      ans = ans + (i + 1) + ")  " + b[i].value + "\n" + "\n";
    } else {
      ans = ans + (i + 1) + ")  " + b[i].value;
    }
  }
  doc.autoTable([[""]], [[ans]], {
    bodyStyles: {
      valign: "top",
    },
    styles: {
      overflow: "linebreak",
      overflowColumns: false,
      align: "justify",
    },
    columnWidth: "wrap",
    columnStyles: {
      0: {
        cellWidth: 250,
        font: "times",
        fontSize: 14,
        textColor: [0, 0, 0],
      },
    },
    margin: {
      left: 20,
    },

    startY: pos + 2,
    theme: "plain",
  });

  // Workshops ------------------------------------------------------------------
  var finalY = doc.lastAutoTable.finalY + 10;
  var pos = finalY;
  doc.setFontSize(18);
  doc.setTextColor(244, 107, 16);
  doc.text(15, pos, "Workshops : ");
  var ans = "";
  var b = document.getElementsByName("workshop[]");
  for (i = 0; i < b.length; i++) {
    if (i != b.length - 1) {
      ans = ans + (i + 1) + ")  " + b[i].value + "\n" + "\n";
    } else {
      ans = ans + (i + 1) + ")  " + b[i].value;
    }
  }
  doc.autoTable([[""]], [[ans]], {
    bodyStyles: {
      valign: "top",
    },
    styles: {
      overflow: "linebreak",
      overflowColumns: false,
      align: "justify",
    },
    columnWidth: "wrap",
    columnStyles: {
      0: {
        cellWidth: 250,
        font: "times",
        fontSize: 14,
        textColor: [0, 0, 0],
      },
    },
    margin: {
      left: 20,
    },

    startY: pos + 2,
    theme: "plain",
  });
  //memberships ------------------------------------------------------------------
  var finalY = doc.lastAutoTable.finalY + 10;
  var pos = finalY;
  doc.setFontSize(18);
  doc.setTextColor(244, 107, 16);
  doc.text(15, pos, "Professional Memberships : ");
  var ans = "";
  var b = document.getElementsByName("membership[]");
  for (i = 0; i < b.length; i++) {
    if (i != b.length - 1) {
      ans = ans + (i + 1) + ")  " + b[i].value + "\n" + "\n";
    } else {
      ans = ans + (i + 1) + ")  " + b[i].value;
    }
  }
  doc.autoTable([[""]], [[ans]], {
    bodyStyles: {
      valign: "top",
    },
    styles: {
      overflow: "linebreak",
      overflowColumns: false,
      align: "justify",
    },
    columnWidth: "wrap",
    columnStyles: {
      0: {
        cellWidth: 250,
        font: "times",
        fontSize: 14,
        textColor: [0, 0, 0],
      },
    },
    margin: {
      left: 20,
    },

    startY: pos + 2,
    theme: "plain",
  });
  // achievements ------------------------------------------------------------------
  var finalY = doc.lastAutoTable.finalY + 10;
  var pos = finalY;
  doc.setFontSize(18);
  doc.setTextColor(244, 107, 16);
  doc.text(15, pos, "Any Other Achievements: ");
  var ans = "";
  var b = document.getElementsByName("achievement[]");
  for (i = 0; i < b.length; i++) {
    if (i != b.length - 1) {
      ans = ans + (i + 1) + ")  " + b[i].value + "\n" + "\n";
    } else {
      ans = ans + (i + 1) + ")  " + b[i].value;
    }
  }
  doc.autoTable([[""]], [[ans]], {
    bodyStyles: {
      valign: "top",
    },
    styles: {
      overflow: "linebreak",
      overflowColumns: false,
      align: "justify",
    },
    columnWidth: "wrap",
    columnStyles: {
      0: {
        cellWidth: 250,
        font: "times",
        fontSize: 14,
        textColor: [0, 0, 0],
      },
    },
    margin: {
      left: 20,
    },

    startY: pos + 2,
    theme: "plain",
  });

  // quizzes ------------------------------------------------------------------
  var finalY = doc.lastAutoTable.finalY + 10;
  var pos = finalY;
  doc.setFontSize(18);
  doc.setTextColor(244, 107, 16);
  doc.text(15, pos, "Online Quizzes : ");
  var ans = "";
  var b = document.getElementsByName("quiz[]");
  for (i = 0; i < b.length; i++) {
    if (i != b.length - 1) {
      ans = ans + (i + 1) + ")  " + b[i].value + "\n" + "\n";
    } else {
      ans = ans + (i + 1) + ")  " + b[i].value;
    }
  }
  doc.autoTable([[""]], [[ans]], {
    bodyStyles: {
      valign: "top",
    },
    styles: {
      overflow: "linebreak",
      overflowColumns: false,
      align: "justify",
    },
    columnWidth: "wrap",
    columnStyles: {
      0: {
        cellWidth: 250,
        font: "times",
        fontSize: 14,
        textColor: [0, 0, 0],
      },
    },
    margin: {
      left: 20,
    },

    startY: pos + 2,
    theme: "plain",
  });
  // certifications ------------------------------------------------------------------
  var finalY = doc.lastAutoTable.finalY + 10;
  var pos = finalY;
  doc.setFontSize(18);
  doc.setTextColor(244, 107, 16);
  doc.text(15, pos, "Certifications : ");
  var ans = "";
  var b = document.getElementsByName("certification[]");
  for (i = 0; i < b.length; i++) {
    if (i != b.length - 1) {
      ans = ans + (i + 1) + ")  " + b[i].value + "\n" + "\n";
    } else {
      ans = ans + (i + 1) + ")  " + b[i].value;
    }
  }
  doc.autoTable([[""]], [[ans]], {
    bodyStyles: {
      valign: "top",
    },
    styles: {
      overflow: "linebreak",
      overflowColumns: false,
      align: "justify",
    },
    columnWidth: "wrap",
    columnStyles: {
      0: {
        cellWidth: 250,
        font: "times",
        fontSize: 14,
        textColor: [0, 0, 0],
      },
    },
    margin: {
      left: 20,
    },

    startY: pos + 2,
    theme: "plain",
  });
  var totalPages = doc.internal.getNumberOfPages();

  for (var i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    doc.setTextColor(255, 255, 255);
    doc.text(40, 399, "");
    doc.text(40, 401, "");
    doc.text(40, 402, "");
    doc.text(40, 403, "");
    doc.text(40, 404, "");
    doc.text(40, 405, "");
    doc.text(40, 406, "");

    var pageSize = doc.internal.pageSize;
    var pageWidth = pageSize.width;
    var pageHeight = pageSize.height;

    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  }

  window.open(doc.output("bloburl"));
}

function display() {
  var firstname = document.getElementsByName("firstname")[0].value;
  var lastname = document.getElementsByName("lastname")[0].value;
  var des = document.getElementById("designation").value;
  var dep = document.getElementById("department").value;
  var yearsT = document.getElementsByName("yearsTeaching")[0].value;
  var yearsR = document.getElementsByName("yearsResearch")[0].value;
  var email = document.getElementById("email").value;
  var phonenumber = document.getElementById("phonenumber").value;
  var photo = document.getElementById("photo").getAttribute("src");
  var area = document.getElementsByName("name[]");
  var joinDate = document.getElementById("joinDate").value;
  var qual = document.getElementsByName("QUALIFICATION[]");
  var degree = document.getElementsByName("degree[]");
  var uni = document.getElementsByName("university[]");
  var pat = document.getElementsByName("patent[]");
  var book = document.getElementsByName("books[]");
  var jou = document.getElementsByName("journal[]");
  var icon = document.getElementsByName("Iconference[]");
  var ncon = document.getElementsByName("Nconference[]");
  var fdp = document.getElementsByName("fdp[]");
  var webinar = document.getElementsByName("webinar[]");
  var workshop = document.getElementsByName("workshop[]");
  var mem = document.getElementsByName("membership[]");
  var ach = document.getElementsByName("achievement[]");
  var quiz = document.getElementsByName("quiz[]");
  var cer = document.getElementsByName("certification[]");

  var i;
  if (firstname != "" && lastname != "") {
    if (des != "DESIGNATION") {
      if (dep != "DEPARTMENT") {
        if (yearsT != "" || yearsR != "") {
          if (email != "") {
            if (phonenumber != "") {
              if (joinDate != "") {
                if (photo != "img1.png") {
                  for (i = 0; i < mem.length; i++) {
                    if (mem[i].value == "") break;
                  }
                  if (i == mem.length) {
                    for (i = 0; i < area.length; i++) {
                      if (area[i].value == "") break;
                    }
                    if (i == area.length) {
                      for (i = 0; i < qual.length; i++) {
                        if (
                          qual[i].value == "" ||
                          qual[i].value == "qualification" ||
                          uni[i].value == "" ||
                          degree[i].value == ""
                        )
                          break;
                      }
                      if (i == qual.length) {
                        for (i = 0; i < pat.length; i++) {
                          if (pat[i].value == "") break;
                        }
                        if (i == pat.length) {
                          for (i = 0; i < book.length; i++) {
                            if (book[i].value == "") break;
                          }
                          if (i == book.length) {
                            for (i = 0; i < jou.length; i++) {
                              if (jou[i].value == "") break;
                            }
                            if (i == jou.length) {
                              for (i = 0; i < icon.length; i++) {
                                if (icon[i].value == "") break;
                              }
                              if (i == icon.length) {
                                for (i = 0; i < ncon.length; i++) {
                                  if (ncon[i].value == "") break;
                                }
                                if (i == ncon.length) {
                                  for (i = 0; i < fdp.length; i++) {
                                    if (fdp[i].value == "") break;
                                  }
                                  if (i == fdp.length) {
                                    for (i = 0; i < webinar.length; i++) {
                                      if (webinar[i].value == "") break;
                                    }
                                    if (i == webinar.length) {
                                      for (i = 0; i < workshop.length; i++) {
                                        if (workshop[i].value == "") break;
                                      }
                                      if (i == workshop.length) {
                                        for (i = 0; i < ach.length; i++) {
                                          if (ach[i].value == "") break;
                                        }
                                        if (i == ach.length) {
                                          for (i = 0; i < quiz.length; i++) {
                                            if (quiz[i].value == "") break;
                                          }
                                          if (i == quiz.length) {
                                            for (i = 0; i < cer.length; i++) {
                                              if (cer[i].value == "") break;
                                            }
                                            if (i == cer.length) {
                                              get();
                                            } else
                                              window.alert(
                                                "fill certifications correctly"
                                              );
                                          } else
                                            window.alert(
                                              "fill online quizzes correctly"
                                            );
                                        } else
                                          window.alert(
                                            "fill achievemets details correctly"
                                          );
                                      } else
                                        window.alert(
                                          "fill workshop details correctly"
                                        );
                                    } else
                                      window.alert(
                                        "fill webinar details correctly"
                                      );
                                  } else
                                    window.alert("fill FDP details correctly");
                                } else
                                  window.alert(
                                    "fill national conference details correctly"
                                  );
                              } else
                                window.alert(
                                  "fill international conference details correctly"
                                );
                            } else
                              window.alert(
                                "fill international journal details correctly"
                              );
                          } else window.alert("fill book details correctly");
                        } else window.alert("fill patent details correctly");
                      } else
                        window.alert(
                          "fill educational qualifications correctly"
                        );
                    } else
                      window.alert("fill area of specialization correctly");
                  } else window.alert("fill membership correctly");
                } else window.alert("please pic profile pic");
              } else window.alert("Enter date of joining");
            } else window.alert("fill phonenumber correctly");
          } else window.alert("fill email correctly");
        } else window.alert("fill years of experience correctly");
      } else window.alert("fill department correctly");
    } else window.alert("fill designation correctly");
  } else window.alert("fill name correctly");
  console.log("Button clicked!");
}
