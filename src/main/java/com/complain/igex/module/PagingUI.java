package com.complain.igex.module;


import lombok.Data;
import org.springframework.data.domain.Page;

@Data
public class PagingUI {

    protected int currentPage;

    protected long totalArticles;

    protected int showPages;

    protected int articlesPerPage;

    private int startPage = 0;
    private int lastPage = 0;
    private int nextPage = 0;
    private int prevBlock = 0;
    private int nextBlock = 0;

    private String funcName = "onPage";

    private String listMode = "normal";

    public PagingUI ()
    {
    }

    public PagingUI (Page<?> page)
    {
        setArticlesPerPage (page.getSize ());
        setCurrentPage (page.getNumber () + 1);
        setTotalArticles (page.getTotalElements ());
        setShowPages (10);
    }

    public PagingUI (Page<?> page, String funcName)
    {
        this (page);

        this.funcName = funcName;
    }

    public StringBuffer makeHtml ()
    {
        if ("user".equals (listMode))
            return makeHtmlUser ();
        else
            return makeHtmlNormal ();

    }

    public StringBuffer makeHtmlNormal ()
    {
        StringBuffer str = new StringBuffer ("");

        try
        {
            // 시작 페이지
            startPage = currentPage - ((currentPage - 1) % showPages);

            // 마지막 페이지
            lastPage = (int) Math.ceil ((double) totalArticles / articlesPerPage);

            if (lastPage <= 0)
                lastPage = 1;

            // 다음 페이지
            if (currentPage == lastPage)
                nextPage = lastPage;
            else
                nextPage = currentPage + 1;

            // prevBlock
            prevBlock = currentPage - (currentPage - 1) % showPages - showPages;

            // nextBlock
            nextBlock = currentPage - (currentPage - 1) % showPages + showPages;

            str.append ("<div class='pagination'><ul>");

            // 현재 페이지와 이전 페이지가 같다면 동작 안함
            if (showPages < currentPage)
                str.append ("<li class='pg-prev'><a href='javascript:" + funcName + "(" + (prevBlock - 1) + ")'>이전<i class='fas fa-chevron-left'></i></a></li>");
            else
                str.append ("<li class='pg-prev'><a href='#'>이전<i class='fas fa-chevron-left'></i></a></li>");

            if (lastPage > 0)
            {
                for (int i = startPage; i < (startPage + showPages); i++)
                {
                    if (i == currentPage)
                        str.append ("<li class='current'><a href='#'>" + i + " </a></li>");
                    else
                        str.append ("<li><a href='javascript:" + funcName + "(" + (i - 1) + ");'>" + i + "</a></li>");

                    if (i == lastPage)
                        break;
                }
            }

            if (nextBlock <= lastPage)
                str.append ("<li class='pg-next'><a href='javascript:" + funcName + "(" + (nextPage - 1) + ");'>다음<i class='fas fa-chevron-right'  style='line-height: 32px;'></i></a></li>");
            else
                str.append ("<li class='pg-next'><a href='#'>다음<i class='fas fa-chevron-right'  style='line-height: 32px;'></i></a></li>");

            str.append ("</ul></div>");
        }
        catch (Exception e)
        {
            e.printStackTrace ();
        }

        return str;
    }

    public StringBuffer makeHtmlUser ()
    {
        StringBuffer str = new StringBuffer ();

        try
        {
            // 시작 페이지
            startPage = currentPage - ((currentPage - 1) % showPages);

            // 마지막 페이지
            lastPage = (int) Math.ceil ((double) totalArticles / articlesPerPage);

            if (lastPage <= 0)
                lastPage = 1;

            // 다음 페이지
            if (currentPage == lastPage)
                nextPage = lastPage;
            else
                nextPage = currentPage + 1;

            // prevBlock
            prevBlock = currentPage - (currentPage - 1) % showPages - showPages;

            // nextBlock
            nextBlock = currentPage - (currentPage - 1) % showPages + showPages;

            str.append ("<ul class='pagination'>");

            // 현재 페이지와 이전 페이지가 같다면 동작 안함
            if (showPages < currentPage)
            {
                str.append ("<li class=\"page-item\">\n" +
                        "\t\t\t\t\t<a class=\"page-link\" href=\"javascript:" + funcName + "(" + (prevBlock - 1) + ")\" aria-label=\"Previous\">\n" +
                        "\t\t\t\t\t\t<span aria-hidden=\"true\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\" style='line-height: 32px;'></i></span>\n" +
                        "\t\t\t\t\t\t<span class=\"sr-only\">Previous</span>\n" +
                        "\t\t\t\t\t</a>\n" +
                        "\t\t\t\t</li>");
            }
            else
            {
                str.append ("<li class=\"page-item\">\n" +
                        "\t\t\t\t\t<a class=\"page-link\" href=\"#\" aria-label=\"Previous\">\n" +
                        "\t\t\t\t\t\t<span aria-hidden=\"true\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\" style='line-height: 32px;'></i></span>\n" +
                        "\t\t\t\t\t\t<span class=\"sr-only\">Previous</span>\n" +
                        "\t\t\t\t\t</a>\n" +
                        "\t\t\t\t</li>");
            }

            if (lastPage > 0)
            {
                for (int i = startPage; i < (startPage + showPages); i++)
                {
                    if (i == currentPage)
                        str.append ("<li class=\"page-item active\"><a class=\"page-link\" href=\"javascript:" + funcName + "(" + (i - 1) + ")\">" + i + "</a></li>");
                    else
                        str.append ("<li class=\"page-item\"><a class=\"page-link\" href=\"javascript:" + funcName + "(" + (i - 1) + ")\">" + i + "</a></li>");

                    if (i == lastPage)
                        break;
                }
            }

            if (nextBlock <= lastPage)
            {
                str.append ("<li class=\"page-item\">\n" +
                        "\t\t\t\t\t<a class=\"page-link\" href=\"javascript:" + funcName + "(" + (nextPage - 1) + ");\" aria-label=\"Next\">\n" +
                        "\t\t\t\t\t\t<span aria-hidden=\"true\"><i class=\"fa fa-angle-right\" aria-hidden=\"true\" style='line-height: 32px;'></i></span>\n" +
                        "\t\t\t\t\t\t<span class=\"sr-only\">Next</span>\n" +
                        "\t\t\t\t\t</a>\n" +
                        "\t\t\t\t</li>");
            }
            else
            {
                str.append ("<li class=\"page-item\">\n" +
                        "\t\t\t\t\t<a class=\"page-link\" href=\"#\" aria-label=\"Next\">\n" +
                        "\t\t\t\t\t\t<span aria-hidden=\"true\"><i class=\"fa fa-angle-right\" aria-hidden=\"true\" style='line-height: 32px;'></i></span>\n" +
                        "\t\t\t\t\t\t<span class=\"sr-only\">Next</span>\n" +
                        "\t\t\t\t\t</a>\n" +
                        "\t\t\t\t</li>");
            }

            str.append ("</ul>");
        }
        catch (Exception e)
        {
            e.printStackTrace ();
        }

        return str;
    }
}
