package com.complain.igex.common;


import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.view.AbstractView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Map;

@Service
public class ExcelDownloadView extends AbstractView
{
    public ExcelDownloadView ()
    {
        setContentType ("application/download; utf-8");
    }

    @Override
    protected void renderMergedOutputModel (Map<String, Object> model, HttpServletRequest req, HttpServletResponse res) throws Exception
    {
        String fileName = (String) model.get ("fileName");
        HSSFWorkbook workBook = (HSSFWorkbook) model.get ("workBook");

        res.setContentType (getContentType ());

        String userAgent = req.getHeader ("User-Agent");

        if(userAgent.contains("Firefox")) {
            fileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
        }else if(userAgent.contains("Edge")){
            fileName = URLEncoder.encode(fileName, "utf-8");
        }else if(userAgent.contains("Safari")){ //엣지로 접속하면 (Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586)
            fileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
        }else {
            fileName = URLEncoder.encode(fileName, "utf-8");
        }

        res.setHeader ("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
        res.setHeader ("Content-Transfer-Encoding", "binary");

        OutputStream out = res.getOutputStream ();

        workBook.write (out);

        out.flush ();
    }
}