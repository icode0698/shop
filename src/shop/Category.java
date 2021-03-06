package shop;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import adminbean.Value;
import api.DataLink;
import bean.DetailsBean;

public class Category extends HttpServlet {

	/**
		 * Constructor of the object.
		 */
	public Category() {
		super();
	}

	/**
		 * Destruction of the servlet. <br>
		 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
		 * The doGet method of the servlet. <br>
		 *
		 * This method is called when a form has its tag value method equals to get.
		 * 
		 * @param request the request send by the client to the server
		 * @param response the response send by the server to the client
		 * @throws ServletException if an error occurred
		 * @throws IOException if an error occurred
		 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doPost(request, response);
	}

	/**
		 * The doPost method of the servlet. <br>
		 *
		 * This method is called when a form has its tag value method equals to post.
		 * 
		 * @param request the request send by the client to the server
		 * @param response the response send by the server to the client
		 * @throws ServletException if an error occurred
		 * @throws IOException if an error occurred
		 */
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		DataLink dataLink = new DataLink();
		Connection conn = dataLink.linkData();
		PreparedStatement stmt = null;
		ResultSet rs = null;
		ArrayList<Value> categoryList = new ArrayList<Value>();
		ArrayList<Value> brandList = new ArrayList<Value>();
		PrintWriter out = response.getWriter();
		JSONObject json = new JSONObject();
		try {
			stmt = conn.prepareStatement("select categoryID, categoryName from category");
			rs = stmt.executeQuery();
			while(rs.next()){
				Value category = new Value();
				category.setId(rs.getInt(1));
				category.setName(rs.getString(2));
				categoryList.add(category);
			}
			json.put("status", "success");
			json.put("categoryList", categoryList);
			stmt = conn.prepareStatement("select brandID, brandName from brand order by insertTime desc");
			rs = stmt.executeQuery();
			while(rs.next()){
				Value brand = new Value();
				brand.setId(rs.getInt(1));
				brand.setName(rs.getString(2));
				brandList.add(brand);
			}
			json.put("brandList", brandList);
			out.write(json.toString());
			out.flush();
			out.close();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}

	/**
		 * Initialization of the servlet. <br>
		 *
		 * @throws ServletException if an error occurs
		 */
	public void init() throws ServletException {
		// Put your code here
	}

}
